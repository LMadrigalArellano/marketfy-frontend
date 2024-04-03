export default function Home() {
  return (
    <>
      <main className="flex p-5">
        <h1 className="text-5xl font-bold">Home Page</h1>
      </main>
      <p className="flex p-5">
        Marketfy is a simulated e-commerce platform that allows users to browse products, add them to a shopping cart, manage a wishlist, and simulate the checkout process. The platform ensures persistence of shopping cart data across browser refreshes, the application also contains a section to view the history of orders.
      </p>
      <p className="flex p-5">
        You must be logged in to enjoy the full experience. 
        You can create a new user or Log with default data.
      </p>
      <p className="flex px-5 py-2">
        Default login data:
      </p>
      <p className="flex px-5 py-2">
        <span className="mr-10">Email: leo@leo.com</span>
        <span>Password: 123</span>
      </p>
    </>
  );
}
