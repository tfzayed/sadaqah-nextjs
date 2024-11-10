const BannerRight = () => {
  // write css style here
  const styles = {
    bannerRight: {
      backgroundColor: "#fff",
      borderRadius: "20px",
      boxShadow: "0px 8px 16px 0px #00000026",
      lineHeight: "24px",
      padding: "40px",
    },
  };

  return (
    <div>
      <div style={styles.bannerRight} className="header__flexTwo">
        <div className="showcase">
          <div className="showcase__reg-form">
            <div className="showcase__card-two shadow">
              <h6 className="text-left fw-bold text-dark">
                Want to get notified about projects?
              </h6>
              <span className="text-left text-primary small">
                Just get registered with your mail.
              </span>
              <form className="showcase__form-div" action="">
                <div className="showcase__user-name">
                  <label className="">Email</label>
                  <input
                    type="Email"
                    className="form-control"
                    placeholder="name@example.com"
                    required
                    value=""
                  />
                </div>
                <div className="showcase__user-name">
                  <label className="">Password</label>
                  <div className="">
                    <input
                      type="password"
                      className="form-control"
                      aria-describedby="inputGroupPrepend2"
                      placeholder="**********"
                      required
                      value=""
                    />
                  </div>
                </div>
                <div className="col-md-12 mt-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="invalidCheck2"
                      required
                    />
                    <label className="form-check-label text-dark">
                      We don't receive any money, agree?
                    </label>
                  </div>
                </div>
                <div className="col-md-12 col-12 mt-3">
                  <button className="btn btn-light border" type="submit">
                    Sign in
                  </button>
                  <button className="btn btn-primary ms-2">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="header__gradientBg">
          <div className="header__gradCircle header__gradientBg__circle1"></div>
          <div className="header__gradCircle header__gradientBg__circle2"></div>
          <div className="header__gradCircle header__gradientBg__circle3"></div>
          <div className="header__gradCircle header__gradientBg__circle4"></div>
          <div className="header__gradCircle header__gradientBg__circle5"></div>
        </div>
      </div>
    </div>
  );
};

export default BannerRight;
