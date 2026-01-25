
import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import { Chatbox } from '@/components/showcase/Chatbox';
import { getMessages, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const messages = await getMessages({locale});
  const t = (key: string) => ((messages.PrivacyPolicyPage as any).seo as any)[key] as string;
 
  return {
    title: t('title'),
    description: t('description')
  };
}

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="space-y-3">
        <h2 className="text-2xl font-bold font-headline text-primary">{title}</h2>
        <div className="space-y-4 text-foreground/80">
            {children}
        </div>
    </section>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-semibold text-foreground mt-4">{children}</h3>
);

const PolicyList = ({ children, ordered = false }: { children: React.ReactNode, ordered?: boolean }) => {
    const ListComponent = ordered ? 'ol' : 'ul';
    return (
        <ListComponent className={`list-outside space-y-2 pl-6 ${ordered ? 'list-decimal' : 'list-disc'}`}>
            {children}
        </ListComponent>
    );
};

export default async function PrivacyPolicyPage() {
    const t = await getTranslations('PrivacyPolicyPage');

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold font-headline text-center mb-4">{t('title')}</h1>
                    <p className="text-center text-muted-foreground mb-10">Last updated: 25 January 2026</p>
                    <Separator />
                    <div className="max-w-4xl mx-auto space-y-10 mt-10">
                        
                        <Section title="1. Who we are (Data Controller)">
                            <p>This website (“Site”) is operated by Kermit Plastik Sanayi ve Ticaret Anonim Şirketi (“Kermit Floor”, “we”, “us”).</p>
                            <PolicyList>
                                <li><strong>Data Controller (KVKK):</strong> Kermit Plastik Sanayi ve Ticaret Anonim Şirketi</li>
                                <li><strong>Address:</strong> Cumhuriyet Mh. Cihan Sk. No:4 ÇAYIROVA / KOCAELİ - TÜRKİYE</li>
                                <li><strong>Contact (privacy):</strong> info@kermit.com.tr</li>
                                <li><strong>Phone:</strong> +90 262 658 97 29</li>
                            </PolicyList>
                        </Section>

                        <Section title="2. Scope">
                           <p>This Privacy Policy explains how we collect, use, disclose, and protect personal data when you:</p>
                           <PolicyList>
                            <li>visit the Site,</li>
                            <li>contact us via forms, email, phone, or WhatsApp,</li>
                            <li>request catalogs/technical documents,</li>
                            <li>submit inquiries or RFQs,</li>
                            <li>apply for distributorship/partnership,</li>
                            <li>interact with embedded content (e.g., Instagram), and</li>
                            <li>subscribe to updates (if offered).</li>
                           </PolicyList>
                        </Section>
                        
                        <Section title="3. Personal data we collect">
                            <p>Depending on how you use the Site, we may collect:</p>
                            <SubHeading>A. Data you provide</SubHeading>
                            <PolicyList>
                                <li><strong>Identity/contact:</strong> name, surname, company, title, email, phone</li>
                                <li><strong>Inquiry content:</strong> messages, product interests, project details, attachments</li>
                                <li><strong>Commercial details (B2B):</strong> company address, VAT/tax number, delivery preferences (if applicable)</li>
                            </PolicyList>
                            <SubHeading>B. Data collected automatically</SubHeading>
                            <PolicyList>
                                <li><strong>Device and usage:</strong> IP address, browser type, pages viewed, approximate location (city/country), timestamps, referring URLs</li>
                                <li><strong>Cookies and similar technologies</strong> (see Section 8)</li>
                            </PolicyList>
                            <SubHeading>C. Data from third parties (limited)</SubHeading>
                            <PolicyList>
                                <li>Analytics/measurement providers (aggregated usage stats)</li>
                                <li>Social platforms (when you interact with embedded content)</li>
                            </PolicyList>
                            <p><strong>Note:</strong> We do not intentionally collect special categories of personal data (sensitive data). Please do not submit sensitive data via Site forms.</p>
                        </Section>

                        <Section title="4. Purposes of processing">
                            <p>We process personal data for the following purposes:</p>
                            <PolicyList ordered>
                                <li>Responding to inquiries and providing quotations / product information</li>
                                <li>Customer and relationship management (B2B communications, distributor onboarding)</li>
                                <li>Providing requested resources (catalogs, technical sheets, installation guides)</li>
                                <li>Site operation, security, and fraud prevention</li>
                                <li>Improving the Site (performance, usability, analytics)</li>
                                <li>Legal compliance (recordkeeping, responding to lawful requests)</li>
                                <li>Marketing communications (only where permitted/consented; see Section 7)</li>
                            </PolicyList>
                            <p className="text-sm italic">These purpose disclosures are part of the transparency obligations under KVKK and GDPR.</p>
                        </Section>

                        <Section title="5. Legal bases (KVKK / GDPR)">
                            <p>We rely on one or more legal grounds depending on the context:</p>
                            <p><strong>Under KVKK (Law No. 6698):</strong></p>
                            <PolicyList>
                                <li>Processing is necessary for the establishment, exercise, or protection of a right (e.g., handling disputes, claims)</li>
                                <li>Processing is necessary for the performance of a contract or pre-contract steps (e.g., preparing a quotation at your request)</li>
                                <li>Processing is necessary for legitimate interests of the data controller (e.g., ensuring Site security), provided fundamental rights are not harmed</li>
                                <li>Explicit consent where required (e.g., non-essential cookies, certain marketing)</li>
                            </PolicyList>
                            <p className="text-sm italic">KVKK requires that you disclose the collection method and legal reason.</p>
                            <p><strong>Under GDPR (if applicable):</strong></p>
                            <PolicyList>
                                <li>Contract / pre-contract steps</li>
                                <li>Legitimate interests</li>
                                <li>Consent (e.g., non-essential cookies, direct marketing where required)</li>
                                <li>Legal obligation</li>
                            </PolicyList>
                            <p className="text-sm italic">(Transparency items are derived from GDPR Articles 13/14.)</p>
                        </Section>

                        <Section title="6. Who we share data with (Recipients / Transfers)">
                            <p>We may share personal data with:</p>
                            <PolicyList>
                                <li>IT/hosting providers (e.g., hosting, CDN, website infrastructure)</li>
                                <li>Analytics providers (only as configured; ideally with IP masking and consent where required)</li>
                                <li>Communication tools (email service provider, CRM, customer support tools)</li>
                                <li>Professional advisors (lawyers, accountants) where necessary</li>
                                <li>Authorities / courts where legally required</li>
                            </PolicyList>
                            <p>We do not sell personal data.</p>
                            <p><strong>International transfers:</strong> Your data may be processed in countries other than your own depending on our vendors’ infrastructure. Where required, we use appropriate safeguards (e.g., contractual protections and security measures).</p>
                        </Section>

                        <Section title="7. Marketing communications">
                            <p>If we offer newsletters or promotional messages:</p>
                            <PolicyList>
                                <li>We will send them only with your consent or another lawful basis permitted by applicable law.</li>
                                <li>You can opt out at any time using the unsubscribe link or by emailing info@kermit.com.tr</li>
                            </PolicyList>
                        </Section>

                        <Section title="8. Cookies and similar technologies">
                            <p>We use cookies and similar technologies to:</p>
                            <PolicyList>
                                <li>keep the Site functional,</li>
                                <li>measure usage and improve performance,</li>
                                <li>remember preferences (if enabled),</li>
                                <li>enable embedded content (e.g., social media).</li>
                            </PolicyList>
                            <p><strong>Cookie choices:</strong> Where legally required, we present a cookie banner allowing you to accept/reject non-essential cookies. You can also manage cookies via browser settings.</p>
                            <p className="text-sm italic">(Optional table—populate with your actual tools)</p>
                            <PolicyList>
                                <li><strong>Essential cookies:</strong> required for basic functions</li>
                                <li><strong>Analytics cookies:</strong> [e.g., Google Analytics] (consent-based where required)</li>
                                <li><strong>Marketing cookies:</strong> [if any] (consent-based)</li>
                            </PolicyList>
                        </Section>

                        <Section title="9. Data retention">
                           <p>We retain personal data only as long as necessary for the purposes listed above, then delete or anonymize it, unless a longer retention period is required by law or necessary for establishing/exercising legal rights (e.g., dispute handling). <em className="text-sm">(Retention disclosure is a GDPR transparency item and good practice under KVKK.)</em></p>
                        </Section>

                        <Section title="10. Security">
                            <p>We apply reasonable technical and organizational measures designed to protect personal data against unauthorized access, loss, misuse, alteration, or disclosure. However, no system is 100% secure.</p>
                        </Section>

                        <Section title="11. Your rights (KVKK Art. 11 / GDPR rights where applicable)">
                            <p>Under KVKK, you have rights including (summary): to learn whether your data is processed, request information, learn the purpose and whether it is used accordingly, know third parties to whom data is transferred, request correction/deletion where conditions are met, and object to certain results.</p>
                            <p>Under GDPR (if applicable) you may have rights such as access, rectification, erasure, restriction, portability, and objection, and the right to withdraw consent.</p>
                        </Section>
                        
                        <Section title="12. How to exercise your rights">
                            <p>To submit a request, contact us at:</p>
                            <PolicyList>
                                <li><strong>Email:</strong> info@kermit.com.tr</li>
                                <li><strong>Postal address:</strong> Cumhuriyet Mh. Cihan Sk. No:4 ÇAYIROVA / KOCAELİ - TÜRKİYE</li>
                            </PolicyList>
                            <p>Include sufficient information to verify your identity and clearly describe your request.</p>
                            <p>We may request additional information to confirm identity and process your request in line with applicable law.</p>
                        </Section>

                        <Section title="13. Children’s privacy">
                            <p>The Site is not directed to children. We do not knowingly collect personal data from children.</p>
                        </Section>
                        
                        <Section title="14. Changes to this Privacy Policy">
                           <p>We may update this Privacy Policy from time to time. The “Last updated” date will change accordingly. Material changes will be posted on the Site.</p>
                        </Section>
                    </div>
                </div>
            </main>
            <Footer />
            <Chatbox />
        </div>
    );
}
