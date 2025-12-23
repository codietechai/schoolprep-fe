const Footer = () => {
  return (
    <div className="absolute bottom-0 p-6 text-center dark:text-white-dark ltr:sm:text-left rtl:sm:text-right">
      © {new Date().getFullYear()}. Test Prep All rights reserved.
    </div>
  );
};

export default Footer;
