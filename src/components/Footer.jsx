import { FaGithub } from "react-icons/fa";
import PrivacyModal from "./PrivacyModal";
import TouModal from "./TouModal";

function Footer(props) {
    return (
        <div className={`w-full flex justify-center mt-auto`}>
            <div className="w-[90%] flex justify-between items-center py-4
             md:flex-row flex-col gap-4">
                {/* Footer 좌측 */}
                <div className="flex md:justify-start justify-between gap-2 items-center text-start text-xs md:w-auto w-full">
                    <div>
                        <p>&copy; AIVLE 4기 빅프로젝트 19조</p>
                        {/* <span style={{fontWeight:'bold', paddingRight: '10px'}}>개인정보 처리방침</span> */}
                        <PrivacyModal />
                        <TouModal />
                    </div>
                    {/*  */}
                </div>

                {/* Footer 우측 */}
                <div className="flex justify-end items-center gap-3 md:w-auto w-full">
                    <a href="https://github.com/yewon-saurus/Aivle_4th_BigProject_team19_LiQuest" target="_blank">
                        <FaGithub size={30} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;