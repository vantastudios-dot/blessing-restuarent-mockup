import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center section-padding">
      <div className="text-center">
        <h1 className="font-display text-display-lg uppercase text-[#F6F2EB] mb-4">
          404
        </h1>
        <p className="text-body-lg text-[#8A8A8A] mb-8">
          This page doesn't exist.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
