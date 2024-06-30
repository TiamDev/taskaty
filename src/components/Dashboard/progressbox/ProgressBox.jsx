import React from "react";
import "./progressbox.css";
import Progress from "./Progress";
import image from "./../../../assets/image/mochi-notebook.png";
import ProgressCircular from "./ProgressCircular";
const ProgressBox = () => {
  return (
    <>
      <div className="progress__container">
        <div className="progressbox">
          <div className="row ">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <div className="progress__section row">
                    <div className="col-lg-8 col-md-8 mb-2">
                      <div className="row">
                        <div className="col-2 ">
                          <img src={image} className="image" alt="" />
                        </div>
                        <div className="col-10">
                          {" "}
                          <div className="daily">
                            <h2>Daily Tasks</h2>
                            <div className="w-100">
                              <Progress progress={5}></Progress>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 mt-2 ">
                      {/* <p className="">
                                <i className="bi bi-flag-fill  pe-1 necessary"></i>{" "}
                                2 tasks
                              </p>
                              <p className="">
                                <i className="bi bi-flag-fill  pe-1 important"></i>{" "}
                                5 tasks
                              </p>
                              <p className="">
                                <i className="bi bi-flag-fill  pe-1 normal"></i>{" "}
                                7 tasks
                              </p> */}
                      <div className="row progresses">
                        <div className="col-4">
                          <ProgressCircular></ProgressCircular>
                        </div>
                        <div className="col-4">
                          <ProgressCircular></ProgressCircular>
                        </div>
                        <div className="col-4">
                          <ProgressCircular></ProgressCircular>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProgressBox;
