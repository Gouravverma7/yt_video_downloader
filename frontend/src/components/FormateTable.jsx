export default function FormatTable({formats,startDownload}){
  if(!formats) return null
  return(
    <table className="format-table">
      <thead>
        <tr>
          <th>File type</th>
          <th>Size</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {formats.map((f,i)=>(
          <tr key={i}>
            <td>{f.ext ? `${f.quality} (.${f.ext})` : f.quality}</td>
            <td>{f.size}</td>
            <td>
              <button className="download-btn" onClick={()=>startDownload(f.format_id)}>Download</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}