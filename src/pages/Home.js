import SectionCarousel  from '../sections/SectionCarousel';
import SectionRegEmail from '../sections/SectionRegEmail';
import SectionCompanies from '../sections/SectionCompanies';
import SectionTabJobList from '../sections/SectionTabJobList';
import Footer from '../partials/Footer'
import Header from '../partials/Header'

export default function Home() {
  return (
    <>
        <Header/>
            <main>
                <SectionCarousel />       
                <SectionTabJobList/>
                <SectionRegEmail />
                <SectionCompanies/>
            </main>
          <Footer/>
     
    </>
  );
}
