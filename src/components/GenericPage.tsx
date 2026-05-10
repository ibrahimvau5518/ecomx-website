import { Link } from 'react-router-dom';

export default function GenericPage({ title, children }: { title: string, children?: React.ReactNode }) {
  return (
    <div className="section-padding bg-background min-h-screen">
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <div className="prose text-muted-foreground leading-relaxed">
          {children || (
             <p>This is the placeholder content for the {title} page. It will contain information related to the business and its operational goals.</p>
          )}
        </div>
        <div className="mt-12 flex items-center gap-4 border-t border-border pt-8">
           <Link to="/contact" className="btn-primary">Contact Us</Link>
           <Link to="/" className="btn-outline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}