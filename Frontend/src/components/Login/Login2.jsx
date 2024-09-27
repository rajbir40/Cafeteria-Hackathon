import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper core styles
import 'swiper/css/autoplay'; // Import styles for modules
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SignInImage from "../../assets/log.jpg";
import { useCookies } from 'react-cookie';
// Import the necessary modules from 'swiper/modules'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const serverURL = "http://localhost:5000";

const Login2 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cookies, setCookie] = useCookies(['token']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch(`${serverURL}/api/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setCookie('token', data.token, { path: '/' });
        window.location.href = '/menu';
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred, please try again later');
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log("Login component rendered");
  return (
    <section className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src={SignInImage} alt="sign in" className="mx-auto" />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className={`mt-5 tracking-wide bg-navy-700 font-semibold text-white w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>

                {error && <div className="text-red-500 mt-3">{error}</div>}
              </div>
              <p className="mt-6 text-xs text-gray-600 text-center">
                Don't have an account?{' '}
                <a href="/sign-up" className="border-b border-gray-500 border-dotted">
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]} // Pass modules via props
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            className="mySwiper m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          >
            <SwiperSlide>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TLBpVDIczW_DIWZB7UbOiVOpeRXe35YUag&shttps://drive.google.com/uc?export=view&id=1KZ_Ub_2lZ0dHbKV0fAIhxVhiQA183RCz"
                alt="Slide 1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://example.com/your-image-2.jpg"
                alt="Slide 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://example.com/your-image-3.jpg"
                alt="Slide 3"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Login2;
