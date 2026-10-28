import Link from 'next/link';

const scenarios = [
  ['Single-player Java world', 'Install DH in your local Minecraft profile.', 'No separate server installation to manage.'],
  ['Ordinary multiplayer server', 'Install DH on your client, subject to server rules.', 'Explore to receive terrain; cached LODs can persist between visits.'],
  ['Server that supplies DH LODs', 'The player still needs DH; the owner needs a compatible server mod or plugin.', 'Enable distant generation on both sides for the documented delivery path.'],
  ['Java Realm', 'Treat DH as a client-only experiment, not an official Realms feature.', 'Minecraft recommends joining Realms without mods. Do not assume server-provided DH generation.'],
  ['Bedrock Edition', 'The Java mod is not a Bedrock add-on.', 'Do not put a Java .jar in a Bedrock add-ons folder.'],
];

export default function ClientServerGuide() {
  return <section className="mb-12" aria-labelledby="installation-scenarios">
    <h2 id="installation-scenarios" className="text-2xl font-bold mb-4">Who needs to install Distant Horizons?</h2>
    <div className="overflow-x-auto rounded-xl border border-border" role="region" aria-label="Client and server installation scenarios" tabIndex={0}>
      <table className="min-w-[560px] w-full text-left text-sm"><caption className="p-4 text-left text-text-muted">Choose your play environment before downloading files.</caption><thead className="bg-surface"><tr>{['Where you play', 'Installation', 'What to expect'].map(label => <th className="p-4" scope="col" key={label}>{label}</th>)}</tr></thead><tbody>{scenarios.map(([name, install, limit]) => <tr key={name} className="border-t border-border"><th scope="row" className="p-4 align-top">{name}</th><td className="p-4 align-top text-text-muted">{install}</td><td className="p-4 align-top text-text-muted">{limit}</td></tr>)}</tbody></table>
    </div>
    <h2 className="text-xl font-bold mt-8 mb-3">Does the server need DH if I already installed it?</h2>
    <p className="text-text-muted leading-relaxed">Not for the client-only exploration workflow. A server installation adds a different way to supply LOD data; it does not replace the mod on your PC. Ask the owner which server software and exact DH build they support before changing your installation.</p>
    <h2 className="text-xl font-bold mt-8 mb-3">Paper or Spigot: use the server plugin, not a client jar</h2>
    <p className="text-text-muted leading-relaxed">The official <a className="text-primary underline" href="https://modrinth.com/plugin/distant-horizons-support" target="_blank" rel="noopener noreferrer">Distant Horizons Support plugin</a> is a separate download for Bukkit-compatible servers. Check its own release list against your server version. A Minecraft version supported by the client mod is not automatically supported by the plugin.</p>
    <h2 className="text-xl font-bold mt-8 mb-3">Why is the horizon still empty after joining?</h2>
    <p className="text-text-muted leading-relaxed">First identify whether you are collecting terrain by exploration or receiving server LODs. Increasing client distance alone does not establish that the data exists. For symptoms after setup, use the <Link className="text-primary underline" href="/guides/distant-horizons-server-realms">servers and Realms troubleshooting guide</Link>; for administration, see <Link className="text-primary underline" href="/guides/distant-horizons-server-commands">server commands and distant generation</Link>.</p>
  </section>;
}
