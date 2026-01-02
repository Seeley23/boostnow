import { useEffect } from 'react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbSchema Component
 * 
 * Adds JSON-LD BreadcrumbList Schema to the page for better SEO and navigation in search results.
 * 
 * @param items - Array of breadcrumb items with name and url
 * 
 * @example
 * <BreadcrumbSchema items={[
 *   { name: 'Strona główna', url: 'https://boostnow.pl' },
 *   { name: 'Blog', url: 'https://boostnow.pl/blog' },
 *   { name: 'Article Title', url: 'https://boostnow.pl/blog/1' }
 * ]} />
 */
export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  useEffect(() => {
    const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-breadcrumb-schema]');
    
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    };

    if (breadcrumbScript) {
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    } else {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-breadcrumb-schema', 'true');
      script.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-breadcrumb-schema]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [items]);

  return null; // This component doesn't render anything
}
