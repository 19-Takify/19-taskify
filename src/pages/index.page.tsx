import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';
import useIsDesiredSize from '@/hooks/useIsDesiredSize';
import { PAGE_PATH } from '@/constants/pageUrl';
import Meta from '@/components/Meta';

export default function Home() {
  const isMobile = useIsDesiredSize(375);

  return (
    <>
      <Meta title="Taskify | 일정 관리" />
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href={PAGE_PATH.MAIN}>
            {isMobile ? (
              <Image
                className={styles.logo}
                width="24"
                height="28"
                src="/svgs/header-small-logo.svg"
                alt="헤더 메인 로고 이미지"
              />
            ) : (
              <Image
                className={styles.logo}
                width="121"
                height="39"
                src="/svgs/header-logo.svg"
                alt="헤더 메인 로고 이미지"
              />
            )}
          </Link>
          <ul className={styles.navList}>
            <li>
              <Link href={PAGE_PATH.LOGIN}>로그인</Link>
            </li>
            <li>
              <Link href={PAGE_PATH.SIGNUP}>회원가입</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={styles.mainSection}>
          <figure className={styles.mainSectionImg}>
            <Image
              width={722}
              height={422}
              src="/images/main-section.webp"
              alt="소통 관련 이미지"
              placeholder="blur"
              blurDataURL="/images/main-section.webp"
              priority
            />
          </figure>
          <h1 className={styles.mainTitle}>
            새로운 일정 관리 <span>Taskify</span>
          </h1>
          <h2 className={styles.mainText}>간편하게 일정관리 하기!</h2>
          <Link className={styles.loginBtn} href={PAGE_PATH.LOGIN}>
            로그인
          </Link>
        </section>
        {/* point 섹션 */}
        <section className={styles.pointSection}>
          {/* 우선 순위 */}
          <div className={styles.prioritySection}>
            <div className={styles.priorityBox}>
              <p>Point 1</p>
              <h2>
                일의 우선순위를 <span>관리하세요</span>
              </h2>
            </div>
            <figure className={styles.prioritySectionImg}>
              <Image
                width="594"
                height="498"
                src="/svgs/dashboard.svg"
                alt="할 일 우선 순위 관련 이미지"
                placeholder="blur"
                blurDataURL="/svgs/dashboard.svg"
                loading="lazy"
              />
            </figure>
          </div>
          {/* 할 일 */}
          <div className={styles.todoSection}>
            <figure className={styles.todoSectionImg}>
              <Image
                width="436"
                height="502"
                src="/svgs/create-todo.svg"
                alt="할 일 생성 관련 이미지"
                placeholder="blur"
                blurDataURL="/svgs/dashboard.svg"
                loading="lazy"
              />
            </figure>
            <div className={styles.todoBox}>
              <p>Point 2</p>
              <h2>
                해야 할 일을<span>등록하세요</span>
              </h2>
            </div>
          </div>
        </section>
        {/* productivity */}
        <section className={styles.productivity}>
          <h2>생산성을 높이는 다양한 설정 ⚡</h2>
          <div className={styles.productivityBox}>
            <article>
              <div className={styles.imgBox}>
                <figure className={styles.settingImg}>
                  <Image
                    width="300"
                    height="124"
                    src="/svgs/dashboard-setting.svg"
                    alt="대시보드 설정 관련 이미지"
                    placeholder="blur"
                    blurDataURL="/svgs/dashboard.svg"
                    loading="lazy"
                  />
                </figure>
              </div>
              <div className={styles.textBox}>
                <h3>대시보드 설정</h3>
                <p>대시보드 사진과 이름을 변경할 수 있어요.</p>
              </div>
            </article>
            <article>
              <div className={styles.imgBox}>
                <figure className={styles.inviteImg}>
                  <Image
                    width="300"
                    height="230"
                    src="/svgs/dashboard-invite.svg"
                    alt="대시보드 초대 관련 이미지"
                    placeholder="blur"
                    blurDataURL="/svgs/dashboard.svg"
                    loading="lazy"
                  />
                </figure>
              </div>
              <div className={styles.textBox}>
                <h3>초대</h3>
                <p>새로운 팀원을 초대할 수 있어요.</p>
              </div>
            </article>
            <article>
              <div className={styles.imgBox}>
                <figure className={styles.memberImg}>
                  <Image
                    width="300"
                    height="195"
                    src="/svgs/dashboard-member.svg"
                    alt="대시보드 멤버 관련 이미지"
                    placeholder="blur"
                    blurDataURL="/svgs/dashboard.svg"
                    loading="lazy"
                  />
                </figure>
              </div>
              <div className={styles.textBox}>
                <h3>구성원</h3>
                <p>구성원을 초대하고 내보낼 수 있어요.</p>
              </div>
            </article>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>©codeit - 2023</p>
        <ul className={styles.subMenuList}>
          <li>Privacy Policy</li>
          <li>FAQ</li>
        </ul>
        <ul className={styles.snsList}>
          <li>
            <Image
              width="20"
              height="20"
              src="/svgs/email.svg"
              alt="이메일 이미지"
              loading="lazy"
            />
          </li>
          <li>
            <Image
              width="20"
              height="20"
              src="/svgs/facebook.svg"
              alt="페이스북 이미지"
              loading="lazy"
            />
          </li>
          <li>
            <Image
              width="20"
              height="20"
              src="/svgs/instagram.svg"
              alt="인스타그램 이미지"
              loading="lazy"
            />
          </li>
        </ul>
      </footer>
    </>
  );
}
