# Airbnb Clone

This project is an Airbnb clone developed using TypeScript and Next.js. It focuses on backend interaction using Prisma and Supabase for functionalities like creating and editing listings, managing reservations, and adding/removing listings from favorites. Server actions in Next.js are utilized for these features.

## Technologies Used

- **Frontend Framework**: Next.js
- **UI Library**: Shadcn UI with Tailwind CSS
- **Backend Interaction**: Prisma and Supabase
- **Authentication**: KindAuth (Third-party authentication provider)

## Key Features

- **Listing Management**: Users can create, edit, and view listings.
- **Reservation Handling**: Allows users to manage their reservations.
- **Favorites**: Users can add/remove listings to/from their favorites list.
- **Authentication**: Utilizes KindAuth for seamless authentication.

## Challenges and Learning

Working with Prisma and Supabase for backend interactions posed challenges initially, but through this project, I gained a deeper understanding of how to effectively utilize them. Additionally, incorporating functionalities such as working with dates and maps added complexity, but I successfully integrated them into the project.

## Components and Design

The frontend is designed using Shadcn UI components along with Tailwind CSS for styling. Components from Shadcn UI are leveraged to design various parts of the project.

## Project Structure

- **RootLayout**: Defines the basic layout structure for the application.
- **Home**: Displays listings based on filter parameters.
- **ReservationPage**: Displays user reservations and allows cancelation.
- **MyListingsPage**: Shows listings created by the user with options to delete or edit.
- **ListingPage**: Displays detailed information about a specific listing and allows users to make reservations.
- **MyFavoritesPage**: Shows listings added to the user's favorites list.
- **EditListingPage**: Allows users to edit their listings.
- **CreateListingPage**: Provides a form for users to create new listings.


## Getting Started

To run the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables for Prisma and Supabase.
4. Run the development server using `npm run dev`.


## License

This project is licensed under the [MIT License](LICENSE).
