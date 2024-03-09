import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl ">Enjoying reading the Blogs?</h2>
        <p className="text-gray-500 my-2">Subscribe to our newsletter</p>
        <Link to={"/"}>
          <Button
            className="rounded-tl-xl rounded-bl-none rounded-br-xl rounded-tr-none mx-auto w-full"
            color="blue"
            disabled
          >
            Coming Soon
          </Button>
        </Link>
      </div>
      <div className="p-7 flex-1">
        <img src="https://www-cms.pipedriveassets.com/cdn-cgi/image/quality=70,format=auto/https://www-cms.pipedriveassets.com/blog-assets/email-newsletter-design.png" />
      </div>
    </div>
  );
}
