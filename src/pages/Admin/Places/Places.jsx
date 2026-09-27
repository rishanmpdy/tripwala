import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { placeStore } from "../../../data/stores";
import "./Places.css";

const categoryOf = (place) => place.category || place.type || "Uncategorised";
const statusOf = (place) => place.status || "Active";

const Places = () => {
  const [places, setPlaces] = useState(placeStore.get());
useEffect(() => {
    const handleUpdate = () => setPlaces(placeStore.get());
    window.addEventListener("tripwala-places-updated", handleUpdate);
    return () => window.removeEventListener("tripwala-places-updated", handleUpdate);
  }, []);
  const [search, setSearch] = useState("");
  const filteredPlaces = useMemo(() => {
    const value = search.toLowerCase().trim();
    return value ? places.filter((place) => [place.name, categoryOf(place), place.location].some((field) => field?.toLowerCase().includes(value))) : places;
  }, [places, search]);
  const updatePlaces = (next) => { setPlaces(next); placeStore.save(next); };
  const handleDelete = (id) => { if (window.confirm("Are you sure you want to delete this place?")) updatePlaces(places.filter((place) => place.id !== id)); };
  const handleToggleStatus = (id) => updatePlaces(places.map((place) => place.id === id ? { ...place, status: statusOf(place) === "Active" ? "Inactive" : "Active" } : place));

  return <div className="places-admin"><div className="places-page-header"><div><h2>Places</h2><p>Manage tourist places in Tripwala.</p></div><Link to="/admin/places/new" className="places-add-btn"><span>+</span>Add Place</Link></div><div className="places-toolbar"><div className="places-search"><span>⌕</span><input type="search" placeholder="Search places..." value={search} onChange={(event) => setSearch(event.target.value)} /></div><div className="places-count">{filteredPlaces.length} Places</div></div><div className="places-table-wrapper"><table className="places-table"><thead><tr><th>Place</th><th>Category</th><th>Location</th><th>Status</th><th className="places-action-head">Actions</th></tr></thead><tbody>{filteredPlaces.length ? filteredPlaces.map((place) => <tr key={place.id}><td><div className="place-table-info"><div className="place-table-image">{(place.image || place.images?.[0]) ? <img src={place.image || place.images[0]} alt={place.name} /> : <span>IMG</span>}</div><div><strong>{place.name}</strong><p>{place.description}</p></div></div></td><td><span className="place-category">{categoryOf(place)}</span></td><td><span className="place-location">{place.location}</span></td><td><button type="button" className={`place-status ${statusOf(place).toLowerCase()}`} onClick={() => handleToggleStatus(place.id)}><span />{statusOf(place)}</button></td><td><div className="place-actions"><Link to={`/admin/places/${place.id}/edit`} className="place-action edit">Edit</Link><button type="button" className="place-action delete" onClick={() => handleDelete(place.id)}>Delete</button></div></td></tr>) : <tr><td colSpan="5" className="places-empty"><strong>No places found</strong><span>Try another search or add a new place.</span></td></tr>}</tbody></table></div></div>;
};
export default Places;


