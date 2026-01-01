import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="container-corporate text-center">
          <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-6 block">
            Error 404
          </span>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto mb-10">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="hero">
              Return Home
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
