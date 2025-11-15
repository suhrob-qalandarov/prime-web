
import './contact.css'
import { Stack } from "@mui/material";
import PageHeader from "../../common/PageHeader";

const Contact = () => {
    return (
        <Stack className="contact-page">
            <PageHeader title="Kontaktlar" />

            <Stack className="contact-info-section">
                <div className="container-custom">
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6">
                            <div className="contact-section">
                                <h3 className="section-title">Kontaktlar</h3>
                                <div className="contact-content">
                                    <i className="fab fa-telegram-plane"></i>
                                    <span>Telegram:
                                <a href="https://t.me/prime77admin" target="_blank" rel="noreferrer">{" "}@prime77admin</a>
                            </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="contact-section">
                                <h3 className="section-title">Bizning do'konlar</h3>
                                <div className="contact-content">
                                    <div className="store-coming-soon">
                                        <span>Tez orada...</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="contact-section">
                                <h3 className="section-title">Ishlash vaqtlari</h3>
                                <div className="contact-content">
                                    <div className="working-hours">
                                        <span>Har kuni: 10:00 - 20:00 GMT+5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Stack>
        </Stack>
    );
};

export default Contact;