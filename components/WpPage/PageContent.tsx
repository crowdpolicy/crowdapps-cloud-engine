import { typeOfPageContent } from "../../helpers/types/home";

export default function PageContent(props: typeOfPageContent) {
  return (
    <section className="page-content flex flex-col items-center ">
      <h1
        className="text-5xl font-semibold py-10 max-w-[65%]"
        dangerouslySetInnerHTML={{
          __html: props.page?.title?.rendered || "",
        }}
      ></h1>
      <div
        className="max-w-[65%] text-left"
        dangerouslySetInnerHTML={{
          __html: props.page?.content?.rendered || "",
        }}
      ></div>
    </section>
  );
}
