import Head from "next/head";

interface MetaProps {
    title: string;
  }
  
const Meta: React.FC<MetaProps> = ({title}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Oλοκληρωμένη σουίτα cloud εφαρμογών"
          key="desc"
        />
        <meta
          property="og:title"
          content={title}
        />
        <meta
          property="og:description"
          content="Oλοκληρωμένη σουίτα cloud εφαρμογών"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://hello.crowdapps.cloud/" />
        <meta
          property="og:title"
          content={title}
        />
        <meta
          property="og:description"
          content="Oλοκληρωμένη σουίτα cloud εφαρμογών"
        />
        <meta property="og:image" content="https://hello.crowdapps.cloud/SOCIAL-SHARE.jpg" />
        <meta property="og:image:alt" content="Crowdapps" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://hello.crowdapps.cloud/" />
        <meta
          property="twitter:title"
          content="Oλοκληρωμένη σουίτα cloud εφαρμογών"
        />
        <meta
          property="twitter:description"
          content="Oλοκληρωμένη σουίτα cloud εφαρμογών"
        />
        <meta property="twitter:image" content="https://hello.crowdapps.cloud/SOCIAL-SHARE.jpg" />
        <meta name="google-site-verification" content="rEzO5IRg2EkORcudRyC2T5uJQc5mF38JFRd13kDZauo" />
      </Head>
    </>
  );
};
export default Meta;