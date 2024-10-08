import { useState } from "react";
import { pinata } from "../../../pinata";

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);

    const changeHandler = (event) => {
        setSelectedFile(event.target?.files?.[0]);
    };

    const handleSubmission = async () => {
        try {
            const upload = await pinata.upload.file(selectedFile)
            console.log(upload);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <label className="form-label"> Choose File</label>
            <input type="file" onChange={changeHandler} />
            <button onClick={handleSubmission}>Submit</button>
        </>
    );
}

export default Upload;
