import BannerRight from "@/components/home/BannerRight";
import languages from "@/config/language.json";
import DynamicIcon from "@/helpers/DynamicIcon";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { getActiveLanguages } from "@/lib/languageParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { Button, Feature } from "@/types";
import Link from "next/link";
import path from "path";
import { FaCheck } from "react-icons/fa";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}

const Home = ({ params }: { params: { lang: string } }) => {
  const lang = params.lang;
  const language = languages.find(
    (language) => language.languageCode === lang,
  )!;
  const homepage = getListPage(
    path.join(language?.contentDir, "homepage/_index.md"),
  );
  const testimonial = getListPage(
    path.join(language.contentDir, "sections/testimonial.md"),
  );
  const callToAction = getListPage(
    path.join(language.contentDir, "sections/call-to-action.md"),
  );
  const { frontmatter } = homepage;
  const {
    banner,
    features,
  }: {
    banner: {
      title: string;
      app: any;
      content?: string;
      button?: Button;
      stats: any;
    };
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <section className="section bg-[#ffffffef] bg-[url('/images/banner-bg.jpeg')] bg-cover bg-center bg-blend-overlay	bg-fixed bg-no-repeat pt-[190px]">
        <div className="container">
          <div className="row justify-center px-20 py-12">
            <div className="col-7">
              <h1
                className="mb-2 text-h2 lg:text-[52px] font-medium"
                dangerouslySetInnerHTML={markdownify(banner.title)}
              />
              <p
                className="mb-4"
                dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
              />
              <div className="flex items-end gap-6">
                {banner.button!.enable && (
                  <div>
                    <Link
                      className="btn btn-primary"
                      href={banner.button!.link}
                      target={
                        banner.button!.link.startsWith("http")
                          ? "_blank"
                          : "_self"
                      }
                      rel="noopener"
                    >
                      <DynamicIcon
                        icon={banner?.button?.icon!}
                        className="inline-block mr-2"
                      />
                      {banner.button!.label}
                    </Link>
                  </div>
                )}

                {banner.app && (
                  <div>
                    <Link
                      href={banner.app.link}
                      target={
                        banner.app.link.startsWith("http") ? "_blank" : "_self"
                      }
                      rel="noopener"
                    >
                      <ImageFallback
                        src={banner.app.image}
                        className=""
                        width="160"
                        height="60"
                        alt="google play store img"
                        priority
                      />
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 mt-14">
                {banner.stats.map((stat: any, index: number) => (
                  <div className="flex items-center gap-2" key={index}>
                    <ImageFallback
                      src={stat.image}
                      className=""
                      width="30"
                      height="30"
                      alt="stats image"
                      priority
                    />
                    <div>
                      <p
                        className="text-xs"
                        dangerouslySetInnerHTML={markdownify(stat.name)}
                      />
                      <p
                        className="font-bold text-xs"
                        dangerouslySetInnerHTML={markdownify(stat.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-5">
              <BannerRight />
            </div>
          </div>
        </div>
      </section>

      {features.map((feature, index: number) => (
        <section
          key={index}
          className={`section-sm ${index % 2 === 0 && "bg-gradient"}`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div
                className={`mb:md-0 mb-6 md:col-5 ${
                  index % 2 !== 0 && "md:order-2"
                }`}
              >
                <ImageFallback
                  src={feature.image}
                  height={480}
                  width={520}
                  alt={feature.title}
                />
              </div>
              <div
                className={`md:col-7 lg:col-6 ${
                  index % 2 !== 0 && "md:order-1"
                }`}
              >
                <h2
                  className="mb-4"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                <ul>
                  {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaCheck className={"absolute left-0 top-1.5"} />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
                {feature.button.enable && (
                  <Link
                    className="btn btn-primary mt-5"
                    href={feature.button.link}
                  >
                    {feature.button.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
