import './about-us.css'
import { Stack } from "@mui/material";

const AboutUs = () => {
    return (
        <Stack className="about-page">

            {/* Page Header */}
            <section className="page-header">
                <div className="container-custom">
                    <div className="page-header-content">
                        <h1 className="page-title">Biz haqimizda</h1>
                        <nav className="breadcrumb-nav">
                            <a href="/" className="breadcrumb-link">Asosiy</a>
                            <span className="breadcrumb-separator">/</span>
                            <span className="breadcrumb-current">Biz haqimizda</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="about-hero">
                <div className="container-custom">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-hero-content">
                                <h2 className="about-hero-title">PRIME77 - Sizning uslubingiz!</h2>
                                <p className="about-hero-text">
                                    Biz 2020-yildan beri erkaklar uchun zamonaviy va sifatli kiyimlar ishlab chiqaramiz.
                                    Har bir mahsulotimiz diqqat bilan tanlab olingan materiallardan tayyorlanadi va
                                    yuqori sifat standartlariga javob beradi.
                                </p>
                                <div className="about-stats">
                                    <div className="stat-item">
                                        <div className="stat-number">1000+</div>
                                        <div className="stat-label">Mamnun mijozlar</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">500+</div>
                                        <div className="stat-label">Mahsulotlar</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">4</div>
                                        <div className="stat-label">Yillik tajriba</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-hero-image">
                                <img src="/images/hero-badge.jpg" alt="Prime77 Team" className="hero-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="mission-vision">
                <div className="container-custom">
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="mission-card">
                                <div className="card-icon">
                                    <i className="fas fa-bullseye"></i>
                                </div>
                                <h3 className="card-title">Bizning maqsadimiz</h3>
                                <p className="card-text">
                                    Har bir erkak o'zining noyob uslubini topishiga yordam berish va
                                    yuqori sifatli, zamonaviy kiyimlar bilan ta'minlash.
                                    Biz mijozlarimizning ehtiyojlarini birinchi o'rinda qo'yamiz.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="vision-card">
                                <div className="card-icon">
                                    <i className="fas fa-eye"></i>
                                </div>
                                <h3 className="card-title">Bizning ko'z o'ngimiz</h3>
                                <p className="card-text">
                                    O'zbekistondagi eng yetakchi erkaklar kiyimi brendi bo'lish va
                                    xalqaro bozorda o'z o'rnimizni egallash. Innovatsiya va sifat
                                    orqali mijozlarimizning ishonchini qozonish.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="container-custom">
                    <div className="section-header">
                        <h2 className="section-title">Bizning qadriyatlarimiz</h2>
                        <p className="section-subtitle">
                            Prime77 ni boshqa brendlardan ajratib turadigan asosiy tamoyillar
                        </p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6">
                            <div className="value-item">
                                <div className="value-icon">
                                    <i className="fas fa-gem"></i>
                                </div>
                                <h4 className="value-title">Sifat</h4>
                                <p className="value-text">
                                    Har bir mahsulotimiz eng yuqori sifat standartlariga javob beradi
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="value-item">
                                <div className="value-icon">
                                    <i className="fas fa-lightbulb"></i>
                                </div>
                                <h4 className="value-title">Innovatsiya</h4>
                                <p className="value-text">
                                    Zamonaviy texnologiyalar va yangi g'oyalarni qo'llaymiz
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="value-item">
                                <div className="value-icon">
                                    <i className="fas fa-handshake"></i>
                                </div>
                                <h4 className="value-title">Ishonch</h4>
                                <p className="value-text">
                                    Mijozlarimiz bilan uzoq muddatli munosabatlar o'rnatamiz
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="value-item">
                                <div className="value-icon">
                                    <i className="fas fa-rocket"></i>
                                </div>
                                <h4 className="value-title">Rivojlanish</h4>
                                <p className="value-text">
                                    Doimo o'sib boramiz va yangi cho'qqilarni zabt etamiz
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section">
                <div className="container-custom">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="story-image">
                                <img src="/images/hero-image.jpeg" alt="Prime77 Story" className="story-img" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="story-content">
                                <h2 className="story-title">Bizning hikoyamiz</h2>
                                <div className="story-timeline">
                                    <div className="timeline-item">
                                        <div className="timeline-year">2020</div>
                                        <div className="timeline-content">
                                            <h4>Boshlanish</h4>
                                            <p>Prime77 brendi kichik do'kon sifatida o'z faoliyatini boshladi</p>
                                        </div>
                                    </div>
                                    <div className="timeline-item">
                                        <div className="timeline-year">2021</div>
                                        <div className="timeline-content">
                                            <h4>Kengayish</h4>
                                            <p>Mahsulotlar assortimenti kengaytirildi va onlayn savdo boshlandi</p>
                                        </div>
                                    </div>
                                    <div className="timeline-item">
                                        <div className="timeline-year">2022</div>
                                        <div className="timeline-content">
                                            <h4>Tan olinish</h4>
                                            <p>Mijozlar orasida mashhurlik qozondi va brendni tan olishdi</p>
                                        </div>
                                    </div>
                                    <div className="timeline-item">
                                        <div className="timeline-year">2024</div>
                                        <div className="timeline-content">
                                            <h4>Bugun</h4>
                                            <p>O'zbekistondagi yetakchi erkaklar kiyimi brendlaridan biri</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="container-custom">
                    <div className="section-header">
                        <h2 className="section-title">Bizning jamoa</h2>
                        <p className="section-subtitle">
                            Prime77 ni muvaffaqiyatga olib kelgan professional jamoa
                        </p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6">
                            <div className="team-member">
                                <div className="member-image">
                                    <img src="/images/" alt="Team Member" className="member-img" />
                                </div>
                                <div className="member-info">
                                    <h4 className="member-name">Asilbek Karimov</h4>
                                    <p className="member-position">Asoschisi va Bosh direktor</p>
                                    <div className="member-social">
                                        <a href="https://t.me/prime77" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-telegram-plane"></i>
                                        </a>
                                        <a href="https://www.instagram.com/prime77" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="team-member">
                                <div className="member-image">
                                    <img src="/images/" alt="Team Member" className="member-img" />
                                </div>
                                <div className="member-info">
                                    <h4 className="member-name">Sardor Umarov</h4>
                                    <p className="member-position">Dizayner</p>
                                    <div className="member-social">
                                        <a href="https://t.me/prime77" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-telegram-plane"></i>
                                        </a>
                                        <a href="https://www.instagram.com/prime77" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="team-member">
                                <div className="member-image">
                                    <img src="/images/" alt="Team Member" className="member-img" />
                                </div>
                                <div className="member-info">
                                    <h4 className="member-name">Dilshod Rahimov</h4>
                                    <p className="member-position">Marketing menejeri</p>
                                    <div className="member-social">
                                        <a href="https://t.me/prime77" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-telegram-plane"></i>
                                        </a>
                                        <a href="https://www.instagram.com/prime77" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container-custom">
                    <div className="cta-content">
                        <h2 className="cta-title">Bizning kolleksiyamizni ko'ring!</h2>
                        <p className="cta-text">
                            Eng so'nggi va zamonaviy erkaklar kiyimlarini kashf eting
                        </p>
                        <div className="cta-buttons">
                            <a href="/catalog" className="btn-custom">Katalogni ko'rish</a>
                            <a href="/contact" className="btn-outline">Biz bilan bog'lanish</a>
                        </div>
                    </div>
                </div>
            </section>

        </Stack>
    );
};

export default AboutUs;
