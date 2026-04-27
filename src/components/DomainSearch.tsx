import { CLIENT_AREA_URL } from "@/data/site";
import { ButtonLink } from "./ButtonLink";

export function DomainSearch() {
  return (
    <div className="domain-search-panel">
      <form action={CLIENT_AREA_URL} method="get" className="domain-search-form">
        <label htmlFor="domain-search">Search your domain</label>
        <div>
          <input
            id="domain-search"
            name="domain"
            type="text"
            placeholder="yourbusiness.com"
            autoComplete="off"
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <p>Domain registration and management continue securely inside the WHMCS client area.</p>
      <ButtonLink href={CLIENT_AREA_URL} variant="secondary">
        Manage Domains
      </ButtonLink>
    </div>
  );
}
