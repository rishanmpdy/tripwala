import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  contactNumberStore,
  resortStore,
  homestayStore,
  defaultContactNumbers,
} from "../../../data/stores";
import "./Settings.css";

const emptyContact = {
  name: "",
  phone: "",
  whatsapp: "",
  category: "All",
  isDefaultResorts: false,
  isDefaultHomestays: false,
  status: "Active",
  assignedResorts: [],
  assignedHomestays: [],
};

const defaultGeneralSettings = {
  platformName: "Tripwala",
  currency: "INR (₹)",
  supportEmail: "support@tripwala.com",
  supportPhone: "+91 94471 88990",
  whatsappTemplate: "Hello, I want to inquire about booking [Property] for [Dates].",
};

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewingDeskId = searchParams.get("desk");

  const [activeTab, setActiveTab] = useState("contactdesk"); // "contactdesk" | "general"

  // Resorts & Homestays list
  const [allResorts, setAllResorts] = useState(() => resortStore.get() || []);
  const [allHomestays, setAllHomestays] = useState(() => homestayStore.get() || []);

  // Contact list state with normalization
  const [contacts, setContactsState] = useState(() => {
    const stored = contactNumberStore.get();
    if (!stored || stored.length === 0) {
      contactNumberStore.save(defaultContactNumbers);
      return defaultContactNumbers;
    }
    const enriched = stored.map((c) => {
      const match = defaultContactNumbers.find((d) => d.id === c.id);
      return {
        ...c,
        assignedResorts: Array.isArray(c.assignedResorts)
          ? c.assignedResorts
          : match?.assignedResorts || [],
        assignedHomestays: Array.isArray(c.assignedHomestays)
          ? c.assignedHomestays
          : match?.assignedHomestays || [],
      };
    });
    if (enriched.length < defaultContactNumbers.length) {
      const existingIds = new Set(enriched.map((c) => c.id));
      defaultContactNumbers.forEach((d) => {
        if (!existingIds.has(d.id)) enriched.push(d);
      });
      contactNumberStore.save(enriched);
    }
    return enriched;
  });

  // General settings state
  const [generalConfig, setGeneralConfig] = useState(() => {
    try {
      const saved = localStorage.getItem("tripwala-general-settings");
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultGeneralSettings;
  });
  const [savedNotice, setSavedNotice] = useState(false);

  // Modal State for Add/Edit Number
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [form, setForm] = useState(emptyContact);

  // Modal State for Assigning Properties
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [tempResortIds, setTempResortIds] = useState([]);
  const [tempHomestayIds, setTempHomestayIds] = useState([]);
  const [assignFilterTab, setAssignFilterTab] = useState("all"); // "all" | "resorts" | "homestays"

  // Active viewing contact
  const viewingContact = viewingDeskId
    ? contacts.find((c) => c.id === viewingDeskId)
    : null;

  useEffect(() => {
    const handleUpdate = () => {
      setContactsState(contactNumberStore.get() || []);
      setAllResorts(resortStore.get() || []);
      setAllHomestays(homestayStore.get() || []);
    };
    window.addEventListener("tripwala-contact-numbers-updated", handleUpdate);
    window.addEventListener("tripwala-resorts-updated", handleUpdate);
    window.addEventListener("tripwala-homestays-updated", handleUpdate);
    return () => {
      window.removeEventListener("tripwala-contact-numbers-updated", handleUpdate);
      window.removeEventListener("tripwala-resorts-updated", handleUpdate);
      window.removeEventListener("tripwala-homestays-updated", handleUpdate);
    };
  }, []);

  const saveContacts = (next) => {
    setContactsState(next);
    contactNumberStore.save(next);
  };

  // Sync property stores with contact assignment
  const syncPropertyStores = (contactId, whatsappNumber, resortIds, homestayIds) => {
    const curResorts = resortStore.get() || [];
    const updatedResorts = curResorts.map((r) => {
      if (resortIds.includes(r.id)) {
        return {
          ...r,
          enquiryContactId: contactId,
          whatsapp: whatsappNumber,
        };
      } else if (r.enquiryContactId === contactId) {
        const fallback = contacts.find((c) => c.isDefaultResorts && c.id !== contactId);
        return {
          ...r,
          enquiryContactId: fallback ? fallback.id : "",
          whatsapp: fallback ? fallback.whatsapp : r.whatsapp,
        };
      }
      return r;
    });
    resortStore.save(updatedResorts);

    const curHomestays = homestayStore.get() || [];
    const updatedHomestays = curHomestays.map((h) => {
      if (homestayIds.includes(h.id)) {
        return {
          ...h,
          enquiryContactId: contactId,
          whatsapp: whatsappNumber,
        };
      } else if (h.enquiryContactId === contactId) {
        const fallback = contacts.find((c) => c.isDefaultHomestays && c.id !== contactId);
        return {
          ...h,
          enquiryContactId: fallback ? fallback.id : "",
          whatsapp: fallback ? fallback.whatsapp : h.whatsapp,
        };
      }
      return h;
    });
    homestayStore.save(updatedHomestays);
  };

  const handleOpenAdd = () => {
    setEditingContact(null);
    setForm(emptyContact);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (contact) => {
    setEditingContact(contact);
    setForm({
      ...contact,
      assignedResorts: contact.assignedResorts || [],
      assignedHomestays: contact.assignedHomestays || [],
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
    setForm(emptyContact);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactName = String(form.name ?? "").trim();
    const cleanNumber = String(form.whatsapp ?? "").trim();
    if (!contactName || !cleanNumber) {
      return alert("Name and WhatsApp number are required.");
    }

    const contactId = editingContact ? editingContact.id : `contact-${Date.now()}`;

    let updatedList = [...contacts];

    if (form.isDefaultResorts) {
      updatedList = updatedList.map((item) => ({
        ...item,
        isDefaultResorts: item.id === contactId,
      }));
    }

    if (form.isDefaultHomestays) {
      updatedList = updatedList.map((item) => ({
        ...item,
        isDefaultHomestays: item.id === contactId,
      }));
    }

    const newContactItem = {
      ...form,
      id: contactId,
      name: contactName,
      whatsapp: cleanNumber,
      phone: String(form.phone ?? "").trim() || cleanNumber,
      assignedResorts: form.assignedResorts || [],
      assignedHomestays: form.assignedHomestays || [],
    };

    if (editingContact) {
      updatedList = updatedList.map((item) =>
        item.id === contactId ? newContactItem : item
      );
    } else {
      updatedList.push(newContactItem);
    }

    saveContacts(updatedList);
    syncPropertyStores(
      contactId,
      cleanNumber,
      newContactItem.assignedResorts,
      newContactItem.assignedHomestays
    );
    handleCloseModal();
  };

  const handleDelete = (id) => {
    const target = contacts.find((c) => c.id === id);
    if (!target) return;
    if (!window.confirm(`Delete "${target.name}"?`)) return;

    const updated = contacts.filter((c) => c.id !== id);
    saveContacts(updated);
    if (viewingDeskId === id) {
      setSearchParams({});
    }
  };

  const handleToggleStatus = (id) => {
    const updated = contacts.map((c) =>
      c.id === id
        ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
        : c
    );
    saveContacts(updated);
  };

  // Open property assignment modal
  const handleOpenAssignModal = (initialTab = "all") => {
    if (!viewingContact) return;
    setAssignFilterTab(initialTab);
    setTempResortIds([...(viewingContact.assignedResorts || [])]);
    setTempHomestayIds([...(viewingContact.assignedHomestays || [])]);
    setIsAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false);
  };

  const toggleResortSelection = (resortId) => {
    setTempResortIds((prev) =>
      prev.includes(resortId)
        ? prev.filter((id) => id !== resortId)
        : [...prev, resortId]
    );
  };

  const toggleHomestaySelection = (homestayId) => {
    setTempHomestayIds((prev) =>
      prev.includes(homestayId)
        ? prev.filter((id) => id !== homestayId)
        : [...prev, homestayId]
    );
  };

  const handleSaveAssignments = () => {
    if (!viewingContact) return;

    const updatedContacts = contacts.map((c) => {
      if (c.id === viewingContact.id) {
        return {
          ...c,
          assignedResorts: tempResortIds,
          assignedHomestays: tempHomestayIds,
        };
      }
      return c;
    });

    saveContacts(updatedContacts);
    syncPropertyStores(
      viewingContact.id,
      viewingContact.whatsapp,
      tempResortIds,
      tempHomestayIds
    );
    handleCloseAssignModal();
  };

  // Quick Remove single property from viewing contact
  const handleRemoveResort = (resortId) => {
    if (!viewingContact) return;
    const nextResorts = (viewingContact.assignedResorts || []).filter(
      (id) => id !== resortId
    );
    const updatedContacts = contacts.map((c) =>
      c.id === viewingContact.id ? { ...c, assignedResorts: nextResorts } : c
    );
    saveContacts(updatedContacts);
    syncPropertyStores(
      viewingContact.id,
      viewingContact.whatsapp,
      nextResorts,
      viewingContact.assignedHomestays || []
    );
  };

  const handleRemoveHomestay = (homestayId) => {
    if (!viewingContact) return;
    const nextHomestays = (viewingContact.assignedHomestays || []).filter(
      (id) => id !== homestayId
    );
    const updatedContacts = contacts.map((c) =>
      c.id === viewingContact.id ? { ...c, assignedHomestays: nextHomestays } : c
    );
    saveContacts(updatedContacts);
    syncPropertyStores(
      viewingContact.id,
      viewingContact.whatsapp,
      viewingContact.assignedResorts || [],
      nextHomestays
    );
  };

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("tripwala-general-settings", JSON.stringify(generalConfig));
    } catch {
      alert("Could not save settings: browser storage is full or blocked.");
      return;
    }
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  // Properties belonging to current viewing contact
  const assignedResortsList = viewingContact
    ? allResorts.filter((r) =>
        (viewingContact.assignedResorts || []).includes(r.id)
      )
    : [];

  const assignedHomestaysList = viewingContact
    ? allHomestays.filter((h) =>
        (viewingContact.assignedHomestays || []).includes(h.id)
      )
    : [];

  return (
    <div className="admin-settings-page">
      {/* ========================================================
          CASE 1: DEDICATED VIEW PAGE FOR A CONTACT DESK NUMBER
          ======================================================== */}
      {viewingContact ? (
        <div className="desk-view-page">
          {/* TOP BAR */}
          <div className="desk-view-nav">
            <div className="desk-header-info">
              <button
                type="button"
                className="btn-back-to-list"
                onClick={() => setSearchParams({})}
              >
                ← Back
              </button>
              <h2>{viewingContact.name}</h2>
              <span className="contact-category-pill">
                {viewingContact.category || "All"}
              </span>
              <span className="desk-header-phone">{viewingContact.whatsapp}</span>
              <a
                href={`https://wa.me/${viewingContact.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="test-wa-link"
              >
                Test WhatsApp
              </a>
              <button
                type="button"
                className={`contact-status-btn ${
                  viewingContact.status === "Active" ? "active" : "inactive"
                }`}
                onClick={() => handleToggleStatus(viewingContact.id)}
              >
                <span />
                {viewingContact.status}
              </button>
            </div>

            <div className="desk-view-actions">
              <button
                type="button"
                className="btn-action edit"
                onClick={() => handleOpenEdit(viewingContact)}
              >
                Edit Desk
              </button>
              <button
                type="button"
                className="settings-primary-btn"
                onClick={() => handleOpenAssignModal("all")}
              >
                + Add Properties
              </button>
            </div>
          </div>

          {/* RESORTS TABLE */}
          <div className="desk-table-section">
            <div className="desk-section-header">
              <h3>Resorts ({assignedResortsList.length})</h3>
              <button
                type="button"
                className="btn-action"
                onClick={() => handleOpenAssignModal("resorts")}
              >
                + Add Resorts
              </button>
            </div>

            <div className="settings-table-wrapper">
              <table className="settings-table">
                <thead>
                  <tr>
                    <th>Resort</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Direct Phone</th>
                    <th className="settings-action-head">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedResortsList.length > 0 ? (
                    assignedResortsList.map((resort) => (
                      <tr key={resort.id}>
                        <td>
                          <Link
                            to={`/admin/resorts/${resort.id}/edit`}
                            className="property-table-link"
                          >
                            <strong>{resort.name}</strong>
                          </Link>
                        </td>
                        <td>{resort.type || "Resort"}</td>
                        <td>{resort.area || resort.location || "Wayanad"}</td>
                        <td>{resort.priceRange || "—"}</td>
                        <td>{resort.resortPhone || resort.phone || "—"}</td>
                        <td>
                          <div className="contact-actions-cell">
                            <Link
                              to={`/admin/resorts/${resort.id}/edit`}
                              className="btn-action edit"
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              className="btn-action delete"
                              onClick={() => handleRemoveResort(resort.id)}
                            >
                              Unassign
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="settings-empty">
                        No resorts assigned to this desk.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* HOMESTAYS TABLE */}
          <div className="desk-table-section">
            <div className="desk-section-header">
              <h3>Homestays ({assignedHomestaysList.length})</h3>
              <button
                type="button"
                className="btn-action"
                onClick={() => handleOpenAssignModal("homestays")}
              >
                + Add Homestays
              </button>
            </div>

            <div className="settings-table-wrapper">
              <table className="settings-table">
                <thead>
                  <tr>
                    <th>Homestay</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Direct Phone</th>
                    <th className="settings-action-head">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedHomestaysList.length > 0 ? (
                    assignedHomestaysList.map((home) => (
                      <tr key={home.id}>
                        <td>
                          <Link
                            to={`/admin/homestays/${home.id}/edit`}
                            className="property-table-link"
                          >
                            <strong>{home.name}</strong>
                          </Link>
                        </td>
                        <td>{home.type || "Homestay"}</td>
                        <td>{home.area || home.district || "Wayanad"}</td>
                        <td>{home.priceRange || "—"}</td>
                        <td>{home.hostPhone || home.phone || "—"}</td>
                        <td>
                          <div className="contact-actions-cell">
                            <Link
                              to={`/admin/homestays/${home.id}/edit`}
                              className="btn-action edit"
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              className="btn-action delete"
                              onClick={() => handleRemoveHomestay(home.id)}
                            >
                              Unassign
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="settings-empty">
                        No homestays assigned to this desk.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================
           CASE 2: MAIN SETTINGS TABS (LIST ONLY IN CONTACTDESK)
           ======================================================== */
        <>
          {/* HEADER WITH CLEAN TABS */}
          <div className="settings-page-header">
            <div className="settings-tabs-clean">
              <button
                type="button"
                className={`settings-tab-pill ${
                  activeTab === "contactdesk" ? "active" : ""
                }`}
                onClick={() => setActiveTab("contactdesk")}
              >
                ContactDesk
              </button>
              <button
                type="button"
                className={`settings-tab-pill ${
                  activeTab === "general" ? "active" : ""
                }`}
                onClick={() => setActiveTab("general")}
              >
                General configurations
              </button>
            </div>

            {activeTab === "contactdesk" && (
              <button
                type="button"
                className="settings-primary-btn"
                onClick={handleOpenAdd}
              >
                <span>+</span> Add Number
              </button>
            )}
          </div>

          {/* TAB 1: CONTACT DESK (CLEAN LIST ONLY, NO PROPERTY PILLS) */}
          {activeTab === "contactdesk" && (
            <div className="settings-tab-content">
              <div className="settings-table-wrapper">
                <table className="settings-table">
                  <thead>
                    <tr>
                      <th>Desk / Name</th>
                      <th>WhatsApp Number</th>
                      <th>Category</th>
                      <th>Default</th>
                      <th>Status</th>
                      <th className="settings-action-head">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.length > 0 ? (
                      contacts.map((contact) => (
                        <tr key={contact.id}>
                          {/* NAME */}
                          <td>
                            <strong className="contact-desk-name">
                              {contact.name}
                            </strong>
                          </td>

                          {/* WHATSAPP NUMBER */}
                          <td>
                            <div className="contact-phone-cell">
                              <span>{contact.whatsapp}</span>
                              <a
                                href={`https://wa.me/${contact.whatsapp.replace(
                                  /[^0-9]/g,
                                  ""
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="test-wa-link"
                              >
                                Test
                              </a>
                            </div>
                          </td>

                          {/* CATEGORY */}
                          <td>
                            <span className="contact-category-pill">
                              {contact.category || "All"}
                            </span>
                          </td>

                          {/* DEFAULT */}
                          <td>
                            <div className="default-badges-cell">
                              {contact.isDefaultResorts && (
                                <span className="default-pill resort-pill">
                                  Resorts
                                </span>
                              )}
                              {contact.isDefaultHomestays && (
                                <span className="default-pill homestay-pill">
                                  Homestays
                                </span>
                              )}
                              {!contact.isDefaultResorts &&
                                !contact.isDefaultHomestays && (
                                  <span className="no-default-text">—</span>
                                )}
                            </div>
                          </td>

                          {/* STATUS */}
                          <td>
                            <button
                              type="button"
                              className={`contact-status-btn ${
                                contact.status === "Active" ? "active" : "inactive"
                              }`}
                              onClick={() => handleToggleStatus(contact.id)}
                            >
                              <span />
                              {contact.status}
                            </button>
                          </td>

                          {/* ACTIONS: VIEW, EDIT, DELETE */}
                          <td>
                            <div className="contact-actions-cell">
                              <button
                                type="button"
                                className="btn-action view"
                                onClick={() =>
                                  setSearchParams({ desk: contact.id })
                                }
                              >
                                View
                              </button>
                              <button
                                type="button"
                                className="btn-action edit"
                                onClick={() => handleOpenEdit(contact)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn-action delete"
                                onClick={() => handleDelete(contact.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="settings-empty">
                          No contact numbers configured.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: GENERAL CONFIGURATIONS */}
          {activeTab === "general" && (
            <div className="settings-tab-content">
              <form className="general-form-card" onSubmit={handleSaveGeneral}>
                <div className="general-grid">
                  <div className="general-field">
                    <label>Platform Name</label>
                    <input
                      type="text"
                      value={generalConfig.platformName}
                      onChange={(e) =>
                        setGeneralConfig({
                          ...generalConfig,
                          platformName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="general-field">
                    <label>Default Currency</label>
                    <input
                      type="text"
                      value={generalConfig.currency}
                      onChange={(e) =>
                        setGeneralConfig({
                          ...generalConfig,
                          currency: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="general-field">
                    <label>Support Email</label>
                    <input
                      type="email"
                      value={generalConfig.supportEmail}
                      onChange={(e) =>
                        setGeneralConfig({
                          ...generalConfig,
                          supportEmail: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="general-field">
                    <label>Support Phone</label>
                    <input
                      type="text"
                      value={generalConfig.supportPhone}
                      onChange={(e) =>
                        setGeneralConfig({
                          ...generalConfig,
                          supportPhone: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="general-field full">
                    <label>Default WhatsApp Message</label>
                    <textarea
                      rows="3"
                      value={generalConfig.whatsappTemplate}
                      onChange={(e) =>
                        setGeneralConfig({
                          ...generalConfig,
                          whatsappTemplate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="general-actions">
                  {savedNotice && (
                    <span className="save-notice">✓ Settings saved</span>
                  )}
                  <button type="submit" className="settings-primary-btn">
                    Save Configurations
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}

      {/* ========================================================
          MODAL: ADD / MANAGE RESORTS & HOMESTAYS ASSIGNMENT
          ======================================================== */}
      {isAssignModalOpen && viewingContact && (
        <div
          className="settings-modal-backdrop"
          onClick={handleCloseAssignModal}
        >
          <div
            className="settings-modal-content assign-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>Assign Properties to {viewingContact.name}</h2>
                <p className="assign-modal-sub">
                  Forms on selected properties will redirect WhatsApp enquiries to{" "}
                  <strong>{viewingContact.whatsapp}</strong>.
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={handleCloseAssignModal}
              >
                ×
              </button>
            </div>

            {/* ASSIGN MODAL TABS */}
            <div className="assign-tabs-nav">
              <button
                type="button"
                className={`assign-subtab ${
                  assignFilterTab === "all" ? "active" : ""
                }`}
                onClick={() => setAssignFilterTab("all")}
              >
                All ({allResorts.length + allHomestays.length})
              </button>
              <button
                type="button"
                className={`assign-subtab ${
                  assignFilterTab === "resorts" ? "active" : ""
                }`}
                onClick={() => setAssignFilterTab("resorts")}
              >
                Resorts ({allResorts.length})
              </button>
              <button
                type="button"
                className={`assign-subtab ${
                  assignFilterTab === "homestays" ? "active" : ""
                }`}
                onClick={() => setAssignFilterTab("homestays")}
              >
                Homestays ({allHomestays.length})
              </button>
            </div>

            <div className="assign-modal-body">
              {/* RESORTS SELECTION */}
              {(assignFilterTab === "all" ||
                assignFilterTab === "resorts") && (
                <div className="property-group-section">
                  <div className="property-group-header">
                    <span className="group-title">
                      🏨 Resorts ({tempResortIds.length} / {allResorts.length}{" "}
                      Selected)
                    </span>
                    <div className="group-actions">
                      <button
                        type="button"
                        className="btn-select-all"
                        onClick={() =>
                          setTempResortIds(allResorts.map((r) => r.id))
                        }
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        className="btn-select-all clear"
                        onClick={() => setTempResortIds([])}
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="properties-checkbox-grid">
                    {allResorts.map((resort) => {
                      const isChecked = tempResortIds.includes(resort.id);
                      return (
                        <label
                          key={resort.id}
                          className={`property-check-card ${
                            isChecked ? "selected" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleResortSelection(resort.id)}
                          />
                          <div className="property-check-info">
                            <span className="p-name">{resort.name}</span>
                            <span className="p-meta">
                              {resort.type || "Resort"} •{" "}
                              {resort.location || "Wayanad"}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* HOMESTAYS SELECTION */}
              {(assignFilterTab === "all" ||
                assignFilterTab === "homestays") && (
                <div className="property-group-section">
                  <div className="property-group-header">
                    <span className="group-title">
                      🏡 Homestays ({tempHomestayIds.length} /{" "}
                      {allHomestays.length} Selected)
                    </span>
                    <div className="group-actions">
                      <button
                        type="button"
                        className="btn-select-all"
                        onClick={() =>
                          setTempHomestayIds(allHomestays.map((h) => h.id))
                        }
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        className="btn-select-all clear"
                        onClick={() => setTempHomestayIds([])}
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="properties-checkbox-grid">
                    {allHomestays.map((home) => {
                      const isChecked = tempHomestayIds.includes(home.id);
                      return (
                        <label
                          key={home.id}
                          className={`property-check-card ${
                            isChecked ? "selected" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleHomestaySelection(home.id)}
                          />
                          <div className="property-check-info">
                            <span className="p-name">{home.name}</span>
                            <span className="p-meta">
                              {home.area || home.district || "Homestay"}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn-cancel"
                onClick={handleCloseAssignModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-btn-save"
                onClick={handleSaveAssignments}
              >
                Save Property Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT DESK NUMBER
          ======================================================== */}
      {isModalOpen && (
        <div className="settings-modal-backdrop" onClick={handleCloseModal}>
          <div
            className="settings-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{editingContact ? "Edit Desk Number" : "Add Desk Number"}</h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-field">
                <label>
                  Desk / Name <span>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Wayanad Stays Desk"
                  required
                />
              </div>

              <div className="modal-field">
                <label>
                  WhatsApp Number <span>*</span>
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="e.g. +91 94471 88990"
                  required
                />
              </div>

              <div className="modal-field">
                <label>Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="All">All Categories</option>
                  <option value="Resorts">Resorts</option>
                  <option value="Homestays">Homestays</option>
                </select>
              </div>

              <div className="modal-field">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="modal-checkboxes">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="isDefaultResorts"
                    checked={Boolean(form.isDefaultResorts)}
                    onChange={handleChange}
                  />
                  <span>Default fallback for Resorts</span>
                </label>

                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="isDefaultHomestays"
                    checked={Boolean(form.isDefaultHomestays)}
                    onChange={handleChange}
                  />
                  <span>Default fallback for Homestays</span>
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-btn-cancel"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-btn-save">
                  {editingContact ? "Save Changes" : "Add Number"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
