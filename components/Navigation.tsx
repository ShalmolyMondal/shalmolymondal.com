import NavigationClient from '@/components/NavigationClient';
import { getPersonalInfo, getSiteContent } from '@/lib/data';

export default function Navigation() {
    const site = getSiteContent();
    const personal = getPersonalInfo();
    const brandInitial = personal.name.trim().charAt(0).toUpperCase() || 'S';

    return (
        <NavigationClient
            navItems={site.navigation}
            cta={site.navigationCta}
            brandInitial={brandInitial}
        />
    );
}
