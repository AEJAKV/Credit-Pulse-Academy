import Image from "next/image";

export function Brand({ light = false }) {
  return <div className={`brand ${light ? "brand-light" : ""}`}><Image className="brand-logo" src="/images/logo/creditpulse.png" alt="Credit Pulse" width={1000} height={323} priority /></div>;
}
