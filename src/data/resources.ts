export type Resource = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  icon: string;
};

export const resourceData: Record<string, Resource> = {
  'jwt-algorithm-confusion': {
    slug: 'jwt-algorithm-confusion',
    title: 'JWT Algorithm Confusion: From Theory to Full Account Takeover',
    category: 'Attack Technique',
    date: 'June 2025',
    readTime: '12 min',
    excerpt: 'How a single algorithm parameter in JWT validation logic enables complete authentication bypass in production applications.',
    icon: 'lock',
    content: `
      <h2>Introduction to JWT Algorithm Confusion</h2>
      <p>JSON Web Tokens (JWT) are a common standard for representing claims to be transferred between two parties. However, improper implementation of JWT validation can lead to critical security vulnerabilities, one of the most devastating being "Algorithm Confusion".</p>
      
      <h2>The Core Vulnerability</h2>
      <p>Algorithm confusion occurs when a server-side application accepts a JWT and uses a public key (intended for asymmetric algorithms like RS256) as a secret key for a symmetric algorithm (like HS256). An attacker can then sign a JWT using the public key and the HS256 algorithm, which the server will then validate using the same public key, erroneously treating it as a shared secret.</p>

      <h2>Exploitation Steps</h2>
      <ol>
        <li>Obtain the server's public key (often available at /.well-known/jwks.json).</li>
        <li>Modify the JWT header to use "alg": "HS256".</li>
        <li>Modify the JWT payload to change user identity (e.g., set "sub": "admin").</li>
        <li>Sign the modified JWT using the HS256 algorithm with the public key as the secret.</li>
        <li>Send the forged JWT to the application.</li>
      </ol>

      <h2>Real-World Impact</h2>
      <p>In our recent engagements, we've seen this vulnerability lead to full account takeover, allowing attackers to bypass authentication entirely and gain administrative access to sensitive platforms.</p>

      <h2>Prevention & Mitigation</h2>
      <p>To prevent algorithm confusion, developers should:</p>
      <ul>
        <li>Explicitly define the expected algorithm when validating tokens.</li>
        <li>Avoid using libraries that automatically determine the algorithm from the token header.</li>
        <li>Ensure that the key used for validation matches the intended algorithm type.</li>
      </ul>
    `,
  },
  'active-directory-attack-paths': {
    slug: 'active-directory-attack-paths',
    title: 'Active Directory Attack Paths: BloodHound Analysis in Practice',
    category: 'Red Team',
    date: 'May 2025',
    readTime: '18 min',
    excerpt: "A practitioner's walkthrough of identifying and exploiting BloodHound-derived attack paths to Domain Administrator in enterprise environments.",
    icon: 'network',
    content: `
      <h2>Visualizing AD Attack Paths</h2>
      <p>Active Directory (AD) is the backbone of many enterprise networks, and its complexity often leads to hidden security risks. BloodHound is an essential tool for red teamers to visualize these risks by mapping out attack paths using graph theory.</p>
      
      <h2>Collecting Data with SharpHound</h2>
      <p>The first step in any BloodHound analysis is data collection. SharpHound, the data ingestor, gathers information about users, groups, computers, and permissions within the AD environment.</p>

      <h2>Identifying High-Value Targets</h2>
      <p>Once the data is imported into BloodHound, we can run queries to find shortest paths to high-value targets like "Domain Admins". These paths often involve a combination of:</p>
      <ul>
        <li>Insecure Group Memberships</li>
        <li>Over-privileged Users</li>
        <li>Stale Sessions on Compromised Hosts</li>
        <li>Delegation Rights (e.g., Unconstrained Delegation)</li>
      </ul>

      <h2>Case Study: The "GenericWrite" Path</h2>
      <p>We recently discovered a path where a standard user had 'GenericWrite' permissions over a group that was a member of another group with local admin rights on a critical server. By adding themselves to the intermediate group, they were able to gain control over the server and eventually the domain.</p>

      <h2>Hardening Active Directory</h2>
      <p>Defenders can use BloodHound to proactively identify and close these attack paths. Key strategies include implementing the Tiered Administration Model and enforcing the Principle of Least Privilege.</p>
    `,
  },
  'bypassing-biometric-auth-ios': {
    slug: 'bypassing-biometric-auth-ios',
    title: 'Bypassing Biometric Auth in iOS Banking Apps with Frida',
    category: 'Mobile Security',
    date: 'April 2025',
    readTime: '9 min',
    excerpt: 'Dynamic instrumentation techniques for identifying and exploiting biometric authentication fallback weaknesses in financial mobile applications.',
    icon: 'mobile',
    content: `
      <h2>The Rise of Biometric Auth</h2>
      <p>FaceID and TouchID have become standard for securing mobile banking applications. However, the security of these implementations depends heavily on how the app handles the "fallback" mechanism when biometrics fail.</p>
      
      <h2>Enter Frida: The Swiss Army Knife of Dynamic Instrumentation</h2>
      <p>Frida allows us to inject snippets of JavaScript into native apps on iOS and Android. This is incredibly powerful for bypassing security checks in real-time without needing to modify the app binary on disk.</p>

      <h2>The "Boolean Return" Bypass</h2>
      <p>Many apps use simple boolean checks to determine if biometric authentication was successful. Using Frida, we can hook the method responsible for this check and force it to always return 'true'.</p>

      <pre><code>
// Frida script to bypass biometric check
if (ObjC.available) {
    var hook = ObjC.classes.LAContext['- evaluatePolicy:localizedReason:reply:'];
    Interceptor.attach(hook.implementation, {
        onEnter: function(args) {
            var reply = new ObjC.Block(args[4]);
            const callback = reply.implementation;
            reply.implementation = function(success, error) {
                console.log("Forcing success: true");
                return callback(true, null);
            };
        }
    });
}
      </code></pre>

      <h2>Beyond Simple Hooks</h2>
      <p>Advanced implementations use the Secure Enclave and Keychain to protect sensitive data. Bypassing these requires more sophisticated techniques, such as hooking the LocalAuthentication framework or manipulating the app's state machines.</p>

      <h2>Securing Mobile Apps</h2>
      <p>Developers should use 'LocalAuthentication' correctly and never rely solely on a boolean return value for critical security decisions. Proper implementation involves using 'LAPolicyDeviceOwnerAuthenticationWithBiometrics' and handling the results securely.</p>
    `,
  },
  'aws-iam-privilege-escalation': {
    slug: 'aws-iam-privilege-escalation',
    title: 'AWS IAM Privilege Escalation: 20 Paths to Admin Access',
    category: 'Cloud Security',
    date: 'March 2025',
    readTime: '15 min',
    excerpt: 'Enumerating and exploiting the most common IAM misconfigurations that allow privilege escalation to administrator in AWS environments.',
    icon: 'cloud',
    content: `
      <h2>Understanding IAM Roles and Policies</h2>
      <p>In AWS, Identity and Access Management (IAM) is the gatekeeper. Misconfigured IAM policies are the primary way attackers gain unauthorized access and escalate their privileges within a cloud environment.</p>
      
      <h2>Common Escalation Vector: CreateNewPolicyVersion</h2>
      <p>If a user has the 'iam:CreatePolicyVersion' permission, they can create a new version of a policy they are already attached to, potentially granting themselves 'AdministratorAccess'.</p>

      <h2>Exploiting PassRole</h2>
      <p>The 'iam:PassRole' permission allows a user to pass an IAM role to an AWS service, such as EC2 or Lambda. If a user can pass a highly privileged role to a service they control, they can execute code with that role's permissions.</p>

      <h2>The "AdministratorAccess" Goal</h2>
      <p>The ultimate goal for an attacker is often the 'AdministratorAccess' managed policy. By chaining multiple low-level permissions, an attacker can often find a path to this level of control.</p>

      <h2>Auditing Your AWS Environment</h2>
      <p>Regularly auditing IAM policies using tools like PMapper or Pacu is critical. Organizations should follow the principle of least privilege and use IAM Access Analyzer to identify unintended access.</p>
    `,
  },
  'spear-phishing-anatomy': {
    slug: 'spear-phishing-anatomy',
    title: 'Anatomy of a Spear Phishing Campaign That Achieved 94% Click Rate',
    category: 'Phishing',
    date: 'February 2025',
    readTime: '11 min',
    excerpt: 'A real-world phishing engagement dissection: target research, pretext development, and the psychological triggers that made it devastatingly effective.',
    icon: 'mail',
    content: `
      <h2>The Power of Personalization</h2>
      <p>Spear phishing is far more effective than generic phishing because it is tailored to a specific individual or group. In a recent engagement, we achieved a staggering 94% click rate by leveraging meticulous research and a highly believable pretext.</p>
      
      <h2>Target Research (OSINT)</h2>
      <p>We spent weeks gathering information from LinkedIn, company websites, and social media. We identified a recent internal project and the key stakeholders involved.</p>

      <h2>Crafting the Pretext</h2>
      <p>The email appeared to come from a senior executive, referencing the specific internal project and requesting urgent feedback on a "confidential document" hosted on a familiar-looking (but fraudulent) portal.</p>

      <h2>Psychological Triggers</h2>
      <p>We utilized several psychological triggers to increase the likelihood of success:</p>
      <ul>
        <li><strong>Authority:</strong> The email came from a high-ranking official.</li>
        <li><strong>Urgency:</strong> The request was marked as "Time Sensitive".</li>
        <li><strong>Relevance:</strong> The topic was directly related to the target's current work.</li>
      </ul>

      <h2>Technical Execution</h2>
      <p>We used a custom-built phishing framework that bypassed standard email filters and MFA. The landing page was pixel-perfect and captured credentials in real-time.</p>

      <h2>Defending Against Spear Phishing</h2>
      <p>Employee awareness training is essential, but it must be supplemented with technical controls like DMARC, advanced threat protection, and hardware-based MFA (e.g., YubiKeys).</p>
    `,
  },
  'graphql-security-testing': {
    slug: 'graphql-security-testing',
    title: 'GraphQL Security Testing: From Introspection to Data Exfiltration',
    category: 'API Security',
    date: 'January 2025',
    readTime: '14 min',
    excerpt: 'Complete methodology for GraphQL API security testing, covering introspection abuse, IDOR, batching attacks, and nested query DoS.',
    icon: 'api',
    content: `
      <h2>The Shift to GraphQL</h2>
      <p>GraphQL offers developers a flexible and efficient way to query APIs. However, this flexibility introduces new attack vectors that are often overlooked during traditional security testing.</p>
      
      <h2>Introspection: The Attacker's Map</h2>
      <p>GraphQL's introspection feature allows anyone to query the schema and understand all available types, queries, and mutations. If left enabled in production, it's a goldmine for attackers.</p>

      <h2>Insecure Direct Object References (IDOR)</h2>
      <p>IDOR is just as prevalent in GraphQL as it is in REST. Attackers can manipulate arguments in queries or mutations to access data they shouldn't have access to.</p>

      <h2>Batching Attacks</h2>
      <p>GraphQL allows multiple queries to be sent in a single request. Attackers can use this to perform brute-force attacks or exfiltrate large amounts of data while bypassing rate limits.</p>

      <h2>Nested Query Denial of Service (DoS)</h2>
      <p>Complex, deeply nested queries can consume significant server resources. Without proper depth limiting, an attacker can crash the server with a single, well-crafted query.</p>

      <h2>Securing GraphQL APIs</h2>
      <p>Key defensive measures include disabling introspection in production, implementing robust authorization at the resolver level, and enforcing query depth and complexity limits.</p>
    `,
  },
};
