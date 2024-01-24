import { Card } from "react-bootstrap";

function AboutUs(){
    return(

        <div>

<div className="container mt-4">
        <Card className=" card bg-secondary text-white p-4">
          <Card.Header><h1 className="mb-4">About Us</h1></Card.Header>

          <section className="mb-4">
            <h2>Our Mission</h2>
            <p>
              At [Your Hotel Booking System], our mission is to provide seamless and memorable experiences for our
              customers. We strive to make the process of booking hotels easy, convenient, and enjoyable.
            </p>
          </section>

          <section className="mb-4">
            <h2>Who We Are</h2>
            <p>
              [Your Hotel Booking System] is a leading platform in the travel industry. We are passionate about
              connecting travelers with the perfect accommodation options, ensuring a comfortable stay for every journey.
            </p>
          </section>

          <section className="mb-4">
            <h2>Why Choose Us?</h2>
            <ul>
              <li>Vast Selection: Browse through a diverse range of hotels, from budget-friendly to luxurious, tailored to your preferences.</li>
              <li>Easy Booking: Our user-friendly platform allows you to book your ideal hotel with just a few clicks, ensuring a hassle-free experience.</li>
              <li>Customer Support: Our dedicated support team is available around the clock to assist you with any queries or concerns.</li>
              <li>Secure Transactions: Your privacy and security are our top priorities. We use industry-standard encryption to safeguard your information.</li>
            </ul>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              Have questions or need assistance? Feel free to reach out to our support team at{' '}
              <a href="mailto:support@yourhotelbooking.com" className="text-black">support@yourhotelbooking.com</a>.
            </p>
          </section>
        </Card>
      </div>
        </div>
    )
}

export default AboutUs;