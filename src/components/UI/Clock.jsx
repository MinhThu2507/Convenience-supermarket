import React, { useState, useEffect } from "react";
import '../../assets/styles/clock.css'
const Clock = () => {
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    let interval;

    const countDown = () => {
        // Chuyển đổi từ ngày 1 tháng 1 năm 2023 sang giây
        const destination = new Date("May 5, 2023").getTime();
        interval = setInterval(() => {
        const now = new Date().getTime();

        //  Dùng để tính thời gian kết thúc sự kiện sale
        // lấy thời gian đích trừ thời gian hiện tại
        const different = destination - now;

        // Tính ngày giờ phút giây
        const days = Math.floor(different / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((different % (1000 * 60)) / 1000);

        // Nếu hết thời gian diễn ra sự kiện clearInterval để không bị leak memory
            if(destination < 0) clearInterval(interval.current)
            else {
                setDays(days)
                setHours(hours)
                setMinutes(minutes)
                setSeconds(seconds)
            }
        })
    };

    useEffect(() => {
        countDown()
    })

    return (
        <div className="clock__wrapper d-flex align-items-center gap-3">
            <div className="clock__data d-flex align-items-center gap-3">
                <div className="text-center">
                    <h1 className="text-white fs-3 mb-2">{days}</h1>
                    <h5 className="text-white fs-8">Days</h5>
                </div>
                <span className="text-white fs-3">:</span>
            </div>
            <div className="clock__data d-flex align-items-center gap-3">
                <div className="text-center">
                    <h1 className="text-white fs-3 mb-2">{hours}</h1>
                    <h5 className="text-white fs-8">Hours</h5>
                </div>
                <span className="text-white fs-3">:</span>
            </div>
            <div className="clock__data d-flex align-items-center gap-3">
                <div className="text-center">
                    <h1 className="text-white fs-3 mb-2">{minutes}</h1>
                    <h5 className="text-white fs-8">Minutes</h5>
                </div>
                <span className="text-white fs-3">:</span>
            </div>
            <div className="clock__data d-flex align-items-center gap-3">
                <div className="text-center">
                    <h1 className="text-white fs-3 mb-2">{seconds}</h1>
                    <h5 className="text-white fs-8">Seconds</h5>
                </div>
            </div>
        </div>
    );
};

export default Clock;
