import React from 'react';
import AES from 'crypto-js/aes';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import Pkcs7 from 'crypto-js/pad-pkcs7';
import Button from './elements/Button';

const defaultValue =
  'fairprice://scanandgo/gamification?storeid=184&campaignid=qr-agriculture&landingurl=https://www.fairprice.com.sg/events/in-store/support-local-chews-agriculture';

async function copyToClipboard(value: string) {
  try {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(value);
      return true;
    }

    const element = document.createElement('textarea');
    element.value = value;
    document.body.append(element);
    element.select();
    document.execCommand('copy');
    element.remove();

    return true;
  } catch {
    return false;
  }
}

const LinkGenerator = () => {
  const [deepLink, setDeepLink] = React.useState(defaultValue);
  const [generated, setGenerated] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeepLink(e.target.value);
  };

  const handleGenerateLink = () => {
    try {
      setGenerated(generateLink(deepLink));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (error) {
    throw new Error(error);
  }

  const handleReset = () => {
    setGenerated('');
    setDeepLink('');
    setCopied(false);
  };

  const handleCopyToClipboard = () => {
    copyToClipboard(generated);
    setCopied(true);
  };

  return (
    <div className="flex flex-col max-w-[900px] w-full">
      <input
        value={deepLink}
        onChange={handleChange}
        className="border-2 mb-2 px-2 py-1 rounded-md"
        placeholder="Enter Deeplink"
      />
      <div className="flex w-full flex-1">
        <Button onClick={handleReset} type="button">
          Clear ⌫
        </Button>

        <Button
          onClick={handleGenerateLink}
          type="button"
          disabled={deepLink.length < 5}
        >
          Generate Link 🔗
        </Button>
      </div>

      {generated && (
        <div className="w-full break-words mt-4 flex flex-col">
          <h2 className="text-2xl mb-2">Result</h2>
          <a className="mb-2" href={generated}>
            {generated}
          </a>
          <Button type="button" onClick={handleCopyToClipboard}>
            Copy to Clipboard {copied ? '✅ Copied' : '📋'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LinkGenerator;

function generateLink(deepLink: string) {
  const adjustBaseLink =
    'https://xdfz.adj.st?adjust_t=6ezjuux&adjust_deeplink=';

  const skeySpec = Utf8.parse('$c@n@ndg0R0bin77');
  const ivParameterSpec = Utf8.parse('FP0200Robinson77');

  const uri = new URL(deepLink);

  const queriesArray: string[] = [];

  uri.searchParams.forEach((value, key) => {
    const encryptedValue = AES.encrypt(value, skeySpec, {
      iv: ivParameterSpec,
      padding: Pkcs7,
    });

    const base64Value = Base64.stringify(encryptedValue.ciphertext);

    queriesArray.push(`${key}=${encodeURIComponent(base64Value)}`);
  });

  const encQueries = queriesArray.join('&');

  const encryptedDeepLink = `${uri.protocol}${uri.host}${uri.pathname}?${encQueries}`;

  return `${adjustBaseLink}${encodeURIComponent(encryptedDeepLink)}`;
}
