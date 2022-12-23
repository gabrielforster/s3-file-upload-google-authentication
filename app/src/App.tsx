import { FormEvent, useEffect, useState } from "react";

import { uploadFile } from "./api/uploadFile";
import { API_URL } from "./api/config";
import { getFiles } from "./api/getFiles";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [file, setFile] = useState();
  const [filesList, setFilesList] = useState<any[]>([]);

  function handleSelectFile(e: any) {
    setFile(e.target?.files[0]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newFile = await uploadFile(file);
    setFilesList([...filesList, newFile]);
  }

  useEffect(() => {
    getFiles().then((files) => {
      setFilesList(files);
      setIsAuthenticated(true);
    });
  }, []);

  console.log(API_URL);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-800 text-white">
      {!isAuthenticated ? (
        <a href={`${API_URL}/auth/google`} className="border rounded p-2">
          Login
        </a>
      ) : (
        <main className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <label htmlFor="file">Upload a file</label>
            <input onChange={handleSelectFile} id="file" type="file"></input>
            <button className="border rounded p-2">upload</button>
          </form>

          <div className="mt-5 flex flex-col">
            {filesList.map((file) => (
              <div key={file._id}>
                <a href={`${API_URL}/files/${file.filename}`}>
                  {file.filename}
                </a>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
