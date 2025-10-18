
import React, { useState } from "react";

const API_NUMBER_INFO = "https://gauravapi.gauravyt492.workers.dev/?mobile=";
const API_VEHICLE_BASIC = "https://gauravapi.gauravyt492.workers.dev/?mobile=";
const API_VEHICLE_ADV = "https://gaurav-vehicle-api.gauravyt492.workers.dev/?rc=";
const API_IFSC = "/https://ifsc-info.gauravyt492.workers.dev/?ifsc=";
const API_IP = "/api/ip?ip=";
const API_AADHAR = "https://aadhar.gauravyt492.workers.dev/?aadhar=";
const API_UPI = "/api/upi?upi=";

function ResultBox({ title, data }) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex gap-2">
          <button
            className="px-2 py-1 border rounded text-sm"
            onClick={() => navigator.clipboard.writeText(JSON.stringify(data, null, 2))}
          >
            Copy JSON
          </button>
          <a
            className="px-2 py-1 border rounded text-sm"
            href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`}
            download={`${title.replace(/\s+/g, "_")}.json`}
          >
            Download
          </a>
        </div>
      </div>
      <pre className="mt-3 text-xs overflow-auto max-h-72">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default function AllInOneAPIs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({});

  const callApi = async (label, url) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }
      const json = await res.json();
      setResults((r) => ({ ...r, [label]: json }));
    } catch (err) {
      setError(err.message || String(err));
      setResults((r) => ({ ...r, [label]: { error: err.message || String(err) } }));
    } finally {
      setLoading(false);
    }
  };

  const handleNumberInfo = (e) => {
    e.preventDefault();
    const num = e.target.number.value.trim();
    if (!num) return setError("Enter number");
    callApi("Number Info", `${API_NUMBER_INFO}${encodeURIComponent(num)}`);
  };

  const handleVehicleBasic = (e) => {
    e.preventDefault();
    const rc = e.target.rc_basic.value.trim();
    if (!rc) return setError("Enter RC / reg no");
    callApi("Vehicle Basic", `${API_VEHICLE_BASIC}${encodeURIComponent(rc)}`);
  };

  const handleVehicleAdvanced = (e) => {
    e.preventDefault();
    const rc = e.target.rc_adv.value.trim();
    if (!rc) return setError("Enter RC / reg no");
    callApi("Vehicle Advanced", `${API_VEHICLE_ADV}${encodeURIComponent(rc)}`);
  };

  const handleIfsc = (e) => {
    e.preventDefault();
    const code = e.target.ifsc.value.trim();
    if (!code) return setError("Enter IFSC code");
    callApi("IFSC", `${API_IFSC}${encodeURIComponent(code)}`);
  };

  const handleIp = (e) => {
    e.preventDefault();
    const ip = e.target.ip.value.trim() || "";
    callApi("IP Info", `${API_IP}${encodeURIComponent(ip)}`);
  };

  const handleAadhar = (e) => {
    e.preventDefault();
    const a = e.target.aadhar.value.trim();
    if (!a) return setError("Enter Aadhar-like value");
    callApi("Aadhar Info", `${API_AADHAR}${encodeURIComponent(a)}`);
  };

  const handleUpi = (e) => {
    e.preventDefault();
    const u = e.target.upi.value.trim();
    if (!u) return setError("Enter UPI ID");
    callApi("UPI Info", `${API_UPI}${encodeURIComponent(u)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">All-in-One Info APIs</h1>
          <div className="text-sm text-gray-600">Frontend demo • Replace endpoints in config</div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form onSubmit={handleNumberInfo} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">📞 Number Info</h2>
            <input name="number" placeholder="Enter mobile number" className="w-full border p-2 rounded" />
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">Lookup</button>
              <button type="button" className="px-3 py-1 border rounded" onClick={() => { navigator.clipboard.writeText(API_NUMBER_INFO); alert('Endpoint copied') }}>Copy endpoint</button>
            </div>
          </form>

          <form onSubmit={handleVehicleBasic} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">🚗 Vehicle API - Basic</h2>
            <input name="rc_basic" placeholder="Enter RC / reg no" className="w-full border p-2 rounded" />
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">Lookup</button>
              <button type="button" className="px-3 py-1 border rounded" onClick={() => navigator.clipboard.writeText(API_VEHICLE_BASIC)}>Copy endpoint</button>
            </div>
          </form>

          <form onSubmit={handleVehicleAdvanced} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">🚗 Vehicle API - Advanced</h2>
            <input name="rc_adv" placeholder="Enter RC / reg no" className="w-full border p-2 rounded" />
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">Lookup</button>
              <button type="button" className="px-3 py-1 border rounded" onClick={() => navigator.clipboard.writeText(API_VEHICLE_ADV)}>Copy endpoint</button>
            </div>
          </form>

          <form onSubmit={handleIfsc} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">🏦 IFSC API</h2>
            <input name="ifsc" placeholder="Enter IFSC code" className="w-full border p-2 rounded" />
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">Lookup</button>
              <button type="button" className="px-3 py-1 border rounded" onClick={() => navigator.clipboard.writeText(API_IFSC)}>Copy endpoint</button>
            </div>
          </form>

          <form onSubmit={handleIp} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">🌐 IP Info</h2>
            <input name="ip" placeholder="Enter IP (leave blank for client IP)" className="w-full border p-2 rounded" />
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">Lookup</button>
              <button type="button" className="px-3 py-1 border rounded" onClick={() => navigator.clipboard.writeText(API_IP)}>Copy endpoint</button>
            </div>
          </form>

          <form onSubmit={handleAadhar} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">🆔 Aadhar Info</h2>
            <input name="aadhar" placeholder="Enter placeholder/id (DON'T store sensitive PII in prod)" className="w-full border p-2 rounded" />
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">Lookup</button>
              <button type="button" className="px-3 py-1 border rounded" onClick={() => navigator.clipboard.writeText(API_AADHAR)}>Copy endpoint</button>
            </div>
          </form>

          <form onSubmit={handleUpi} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Upi Info</h2>
            <input name="upi" placeholder="example@bank or example@upi" className="w-full border p-2 rounded" />
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">Lookup</button>
              <button type="button" className="px-3 py-1 border rounded" onClick={() => navigator.clipboard.writeText(API_UPI)}>Copy endpoint</button>
            </div>
          </form>
        </div>

        <div className="mt-6">
          {loading && <div className="p-3 bg-yellow-50 rounded mb-3">Loading...</div>}
          {error && <div className="p-3 bg-red-50 text-red-700 rounded mb-3">Error: {error}</div>}

          {Object.keys(results).length === 0 && (
            <div className="text-gray-600">No results yet — try any lookup above.</div>
          )}

          {Object.entries(results).map(([k, v]) => (
            <ResultBox key={k} title={k} data={v} />
          ))}
        </div>

        <footer className="mt-8 text-sm text-gray-500">
          Tip: set up serverless endpoints that proxy real APIs and protect your keys. You can also add an Admin panel route to review requests and throttle abuse.
        </footer>
      </div>
    </div>
  );
}
