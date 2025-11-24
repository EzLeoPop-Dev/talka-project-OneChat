"use client";
import { useState } from "react";
import AiSupport from "./mainpage/page";
import TemplatesPage from "./templates/templates";
import Receptionist from "./templates/receptionist";
import SaleAgent from "./templates/slaesagent";
import SupportAgent from "./templates/supportagent";
import CearteNew from "./templates/createnew";

export default function page() {
  const [view, setView] = useState("mainpage");
  return (
    <>
      {view === "mainpage" && <AiSupport onNext={() => setView("templates")} />}
      {view === "templates" && (
        <TemplatesPage
          onBack={() => setView("mainpage")}
          onreceptionist={() => setView("receptionist")}
          onsalesagent={() => setView("saleagent")}
          onsupportagent={() => setView("supportagent")}
          oncreatenew={() => setView("createnew")}
        />
      )}
      {view === "receptionist" && (
        <Receptionist
          onNext={() => setView("receptionist")}
          onBack={() => setView("templates")}
        />
      )}
      {view === "saleagent" && (
        <SaleAgent
          onNext={() => setView("saleagent")}
          onBack={() => setView("templates")}
        />
      )}
      {view === "supportagent" && (
        <SupportAgent
          onNext={() => setView("supportagent")}
          onBack={() => setView("templates")}
        />
      )}
      {view === "createnew" && (
        <CearteNew
          onNext={() => setView("createnew")}
          onBack={() => setView("templates")}
        />
      )}
    </>
  );
}
