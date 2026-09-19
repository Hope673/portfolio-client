import WhiteLogo from '../assets/WhiteLogo.png'
import { Link } from 'react-router-dom'
import { FaLinkedin } from 'react-icons/fa'
import{ FaTiktok } from 'react-icons/fa'
const PortfolioFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-[#9ddaf2] text-gray-600 py-12 border-t-[4px] border-blue-600"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Portfolio Footer
      </h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-4">
            <Link to='/'>
              <div className="h-10 w-32 bg-black flex items-center justify-center text-lg text-white font-bold rounded p-5 mb-2">
                <img src={WhiteLogo} alt='Logo Image' className='h-auto w-32' />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-600 font-medium">
              Full-Stack Web Developer building scalable, user-centric web applications from frontend to backend.
            </p>
            <div className="text-sm font-bold">
              <a href="mailto:your.email@example.com" className="text-black hover:text-blue-600 transition-colors">
                Let's build together
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              <Link to='/about'><p  className="text-gray-600 hover:text-blue-600 transition-colors mb-5">About Me</p></Link>
              <Link to='/projects'><p className="text-gray-600 hover:text-blue-600 transition-colors mb-5">Projects</p>
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">

              <a 
                href="https://www.linkedin.com/in/adeyemi-hope-034619413" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
                aria-label="LinkedIn"
              >
                <div className="h-12 w-12 bg-black group-hover:bg-blue-600 text-white flex items-center justify-center text-xs transition-colors rounded">
                  <FaLinkedin className="h-10 w-10"/>
                </div>
              </a>
              <a 
                href="https://tiktok.com/@user2117352130442" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
                aria-label="TikTok"
              >
                <div className="h-12 w-12 bg-black group-hover:bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold transition-colors rounded">
                  <FaTiktok className='h-10 w-10'/>
                </div>
              </a>  
            </div>
          </div>
        </div>
        <div className="pt-8 border-t-2 border-black flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm font-bold text-gray-600">
            &copy; {currentYear} Opatoro Hope Adeyemi. All rights reserved.
          </p>
          
          <div className="text-sm font-bold text-gray-600">
            Built with <span className="text-blue-600">React</span> & <span className="text-blue-600">Tailwind</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default PortfolioFooter;