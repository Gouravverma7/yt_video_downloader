import "../styles/search.css";
export default function SearchBox({ url, setUrl, fetchInfo, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchInfo();
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input autoFocus placeholder="Paste YouTube URL" value={url} onChange={(e) => setUrl(e.target.value)}/>
      <button type="submit" disabled={loading}>
        {loading ? "⏳ Fetching..." : "Start →"}
      </button>
    </form>
  );
}