import ListingForm from "@/components/ListingForm";

const CreateListingPage = () => {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <h2 className="text-3xl text-center mt-10 font-semibold tracking-tight transition-colors">
        Create new listing
      </h2>
      <ListingForm />
    </div>
  );
};

export default CreateListingPage;
