import React from "react";
import "./progressbox.css";
import Progress from "./Progress";
import image from "./../../../assets/image/mochi-notebook.png";

const ProgressBox = () => {
  return (
    <>
      <div className="progressbox">
        <div className="row ">
          <div className="col-12">
            <div className="row">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4 image__container">
                <img src={image} className="image" alt="" />
              </div>
              <div className="col-lg-10 col-md-10 col-sm-10 col-xs-8">
                <div className="progress__section row">
                  <div className="col-lg-12">
                    <div className="">
                      <h2>Daily Tasks</h2>
                      <h6 className="count">Number of Tasks: 6 Tesks</h6>
                      <div className="row">
                        <div className="col-lg-8">
                          <Progress progress={5}></Progress>
                        </div>
                        <div className="col-lg-4">
                          <div className="col-lg-4 priority-header ">
                            <p className="">
                              <i className="bi bi-flag-fill  pe-1 necessary"></i>{" "}
                              2 tasks
                            </p>
                            <p className="">
                              <i className="bi bi-flag-fill  pe-1 important"></i>{" "}
                              5 tasks
                            </p>

                            <p className="">
                              <i className="bi bi-flag-fill  pe-1 normal"></i> 7
                              tasks
                            </p>
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
      </div>
    </>
  );
};
export default ProgressBox;
