import React from "react";
import { SITE_DATA } from "../../components/Field";

function Index() {
  const privacyPoints1 = [
    "We collect anonymous aggregated data exclusively to enhance our website features. Our data collection includes visitor counts, analysis of popular searches, cryptocurrencies, sortings, and other queries. Incoming IP addresses are stored in masked or clear form for brief periods, typically 1 to 2 days, to limit API request rates.",
    "Your device may store first-party cookies for functions like night mode, retaining referer information, unique visitor identification, and session IDs.",
    "The collected data is utilized to enhance user experience and compile website traffic statistics. Session data is regularly purged.",
    "Additionally, data provided through email, Telegram, or contact forms on our website may be stored and utilized to offer services, protect legal rights, enhance product accuracy, effectiveness, security, and usability, or for other purposes agreed upon.",
    "Rest assured, we retain your data only as long as necessary.",
    "It's essential to note that this Privacy Policy applies to all products offered on our website, prevailing unless contradicted by the Terms of Service of any specific product. While this policy establishes a general legal framework for data collection, individual product Terms of Service may regulate this matter differently within their respective scope. In case of contradiction, the pertinent Terms of Service provisions take precedence over this Privacy Policy."
  ];

  const SubHead = ({ text }) =>
    <span className="font-semibold text-[1.1rem] text-black ">
      {text}
    </span>;

  return <div className="lg:py-[100px]  pt-[100px] pb-[50px] overflow-hidden ">
      <div className="container mx-auto px-5 md:w-6/12 text-[1rem] border rounded-md shadow-lg">
        <p className="my-4 bg-[#e8e8e8] rounded p-3 text-[1.2rem]">
          {SITE_DATA.name} neither gathers nor shares personal information with external entities. We do not engage in user tracking.
        </p>
        <h1 className="text-[1.6rem] mt-5">Why is this important?</h1>
        <p className="my-4">
          One of the significant advantages of cryptocurrencies is their ability to facilitate (pseudo)anonymous transactions. Typically, a user's address and transaction details are publicly accessible and immutable, yet their personal identity remains undisclosed as long as no connection exists between the user and their {SITE_DATA.name} data.
        </p>
        <p className="my-4">
          However, privacy can be compromised when sharing information with
          third parties. Cryptocurrency exchanges adhering to KYC policies,
          online retailers mandating delivery addresses, and web wallets
          linked to phone numbers all necessitate the sharing of user data.
        </p>
        <p className="my-4">
          Furthermore, most web servers retain default logs containing IP addresses, User Agent information (browser name and operating system), timestamps of browsing activity, and crucially, the URLs visited. Ordinarily, a cryptocurrency address page is visited only by its owner, and the transaction page is accessed by the involved parties. Consequently, {SITE_DATA.name} explorers can readily establish a digital trail connecting addresses and transactions. Regrettably, this data is also gathered by web analytics tools (such as Google Analytics, Baidu Tongji, Yandex.Metrica), advertising platforms, and similar third-party services.
        </p>
        <p className="my-4">
          User data can also be traced through other means. Content Delivery
          Network (CDN) providers like Cloudflare, Incapsula, and AWS Shield
          function as reverse proxies, requiring some websites to request data
          from a CDN to use the site, thus necessitating the sharing of user
          information.
        </p>
        <p className="my-4">
          In addition to these data tracking services, there are several other
          methods by which users can be identified online.
        </p>
        <div>
          <p className="my-1">
            <SubHead text="HTTP Referer" />: A client request header enabling a server to track the preceding website you visited. For instance, if you go from example.com to explorer.com/1YourBitcoinAddress, example.com will know you came from the latter site.
          </p>
          <p className="my-1">
            <SubHead text="Web Beacon (Bug)" />
            : An invisible web page component confirming a user's visit to a webpage, commonly used for gathering user analytics.
          </p>
          <p className="my-1">
            <SubHead text="Cookies" />
            : Data related to user activities stored in their browser. Third-party cookies may also be integrated into a site's code, particularly if it incorporates elements from other websites.
          </p>
          <p className="my-1">
            <SubHead text="Evercookie" />
            : A JavaScript application that places persistent 'zombie' cookies on a computer. Removing these cookies is challenging as Evercookie recreates them when deleted.
          </p>
          <p className="my-1">
            <SubHead text="Device/Browser Fingerprint" />
            : Information about the device and browser, gathered for user identification purposes.
          </p>
          <p className="my-1">
            <SubHead text="Browser Extensions" />
            : Additional software modules added to web browsers, often used to enhance functionality or modify user experience.
          </p>
        </div>
        <h2 className="text-[1.6rem] mt-5">
          What data do we store and how do we use this data?
        </h2>
        {privacyPoints1?.map((item,key)=>{
            return <p key={key} className="my-3">{item}</p>
        })}
      </div>
    </div>;
}

export default Index;
