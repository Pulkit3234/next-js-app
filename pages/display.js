import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function display() {
  const [result, setResult] = useState();
  const [val, setVal] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/hello", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setVal(true);
      setResult(`Error: ${response.status}`);
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Get: ", data);
    setVal(true);
    setResult(data.hello);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <div>
        <button onClick={(e) => onSubmit(e)}>Hello</button>
      </div>
      <div style={{ marginTop: "40px" }}>{val && result}</div>
    </div>
  );
}
