export const TOPICS = [
  { id: "commands", code: "CMD", label: "Commands", chapter: "CH01" },
  { id: "streams", code: "IO", label: "STDIO", chapter: "CH01" },
  { id: "permissions", code: "PERM", label: "Permissions", chapter: "CH03" },
  { id: "architecture", code: "3T", label: "3-Tier", chapter: "CH09" },
  { id: "cron", code: "CRON", label: "Cron", chapter: "CH06" },
  { id: "init", code: "INIT", label: "Run Levels", chapter: "CH02" },
  { id: "files", code: "FILE", label: "File Types", chapter: "CH03" },
  { id: "path", code: "PATH", label: "PATH", chapter: "CH01" },
  { id: "monitoring", code: "MON", label: "Monitoring", chapter: "CH05" },
  { id: "accounts", code: "USR", label: "Accounts", chapter: "CH04" },
  { id: "ports", code: "PORT", label: "Ports", chapter: "CH07" },
  { id: "osi", code: "OSI", label: "OSI", chapter: "CH07" },
  { id: "webflow", code: "WEB", label: "Website Flow", chapter: "CH07" },
  { id: "tcpudp", code: "TCP", label: "TCP vs UDP", chapter: "CH07" },
  { id: "dns", code: "DNS", label: "DNS", chapter: "CH08" },
  { id: "apache", code: "HTTPD", label: "Apache", chapter: "CH09" },
  { id: "networks", code: "NET", label: "IPv4 Classes", chapter: "CH07" },
  { id: "scripting", code: "SH", label: "Scripting", chapter: "CH06" }
];

export const TOPIC_GUIDES = {
  commands: {
    title: "Commands are verbs with targets",
    objective: "Read most shell tasks as command, options, source, then destination.",
    points: ["`pwd` answers where am I.", "`cp source destination` copies without removing the source.", "`mv old new` renames or moves the source."],
    hint: "Name the action first, then put paths in source-to-destination order.",
    trap: "The common trap is reversing source and destination."
  },
  streams: {
    title: "STDIN, STDOUT, STDERR",
    objective: "Track which stream is being moved and whether the target file is replaced or appended.",
    points: ["STDIN is file descriptor 0.", "STDOUT is 1 and STDERR is 2.", "`>` replaces, `>>` appends, and `2>` catches errors."],
    hint: "Ask whether the prompt wants normal output, errors, or both.",
    trap: "Redirection order matters because the shell processes it left to right."
  },
  permissions: {
    title: "Permissions are three small sums",
    objective: "Convert owner, group, and other permissions by adding r=4, w=2, x=1.",
    points: ["7 is rwx, 6 is rw-, 5 is r-x, 4 is r--.", "Permission order is owner, group, other.", "Special bits use a fourth octal digit: SUID 4, SGID 2, sticky 1."],
    hint: "Split the mode into owner, group, and other before doing any math.",
    trap: "Capital S or T means the special bit exists but execute is missing."
  },
  architecture: {
    title: "Three tiers reduce blast radius",
    objective: "Place web, application, and data systems in separate trust zones.",
    points: ["The web tier faces users and often lives in a DMZ.", "The app tier runs business logic.", "The data tier should not be directly reachable from the Internet."],
    hint: "Ask which tier should be exposed and which tier should be protected.",
    trap: "Do not put the database on the public edge."
  },
  cron: {
    title: "Cron schedules are five fields",
    objective: "Read user crontabs as minute, hour, day of month, month, day of week.",
    points: ["`*` means every valid value.", "`*/5` means every five units in that field.", "Sunday is commonly 0 or 7."],
    hint: "Translate the fields from left to right before reading the command.",
    trap: "`5 * * * *` means minute 5 of every hour, not every 5 minutes."
  },
  init: {
    title: "Init controls service state",
    objective: "Connect classic run levels to modern systemd targets and service commands.",
    points: ["Run level 0 halts and 6 reboots.", "Run level 3 maps to `multi-user.target`.", "Run level 5 maps to `graphical.target`."],
    hint: "Separate current service state from boot-time enablement.",
    trap: "`systemctl start` affects now; `systemctl enable` affects boot."
  },
  files: {
    title: "The first `ls -l` character is the type",
    objective: "Use the leading file-code character to identify the kind of path.",
    points: ["`-` is a regular file.", "`d` is a directory and `l` is a symbolic link.", "`b` is a block device and `c` is a character device."],
    hint: "Look only at the first character before the permission triads.",
    trap: "Do not confuse `l` for long listing with `l` as a symlink marker."
  },
  path: {
    title: "PATH is the command search list",
    objective: "Know how shells find executables and why ordering changes behavior.",
    points: ["PATH is colon-separated.", "Prepending gives a directory higher priority.", "Putting `.` in PATH can run an unsafe local program."],
    hint: "Ask whether the new directory should win before or after existing entries.",
    trap: "Appending and prepending are not equivalent."
  },
  monitoring: {
    title: "Monitoring starts with the failing resource",
    objective: "Choose tools by whether you need processes, disk, logs, or sockets.",
    points: ["`top` shows live process activity.", "`df -h` shows filesystem free space.", "`journalctl` reads the systemd journal."],
    hint: "Classify the symptom: CPU, disk, log, or network socket.",
    trap: "`du` measures directory usage; `df` measures mounted filesystem space."
  },
  accounts: {
    title: "Account files are structured tables",
    objective: "Recall what `/etc/passwd`, `/etc/shadow`, and `/etc/group` store.",
    points: ["`/etc/passwd` has seven colon-separated fields.", "UID 0 is root.", "`x` in passwd usually means the hash is in shadow."],
    hint: "Identify which account file owns the fact being asked.",
    trap: "`/etc/passwd` is not where modern password hashes live."
  },
  ports: {
    title: "Ports identify network services",
    objective: "Pair common services with well-known port numbers and protocols.",
    points: ["SSH is 22/TCP and HTTP is 80/TCP.", "DNS is 53 over UDP and TCP.", "HTTPS is 443/TCP."],
    hint: "Start with the service family: remote login, web, name service, or mail.",
    trap: "DNS is not UDP-only; TCP is also used."
  },
  osi: {
    title: "OSI layers name where a problem lives",
    objective: "Map devices, protocols, and symptoms to the right network layer.",
    points: ["Layer 1 is physical signal.", "Layer 3 is IP routing.", "Layer 4 is TCP/UDP transport."],
    hint: "Ask whether the prompt is about cables, addresses, ports, or applications.",
    trap: "Ports belong to transport, not network."
  },
  webflow: {
    title: "Web requests are a chain",
    objective: "Trace browser traffic through DNS, TCP, TLS, HTTP, and server response.",
    points: ["DNS resolves a name to an address.", "TCP establishes a connection before HTTP over TCP.", "TLS protects HTTPS before application data flows."],
    hint: "Put name lookup before connection setup.",
    trap: "A URL is not directly sent until the client knows where to connect."
  },
  tcpudp: {
    title: "TCP trades speed for reliability",
    objective: "Choose TCP or UDP based on connection state, ordering, and retransmission needs.",
    points: ["TCP has a handshake and ordered reliable delivery.", "UDP has no connection setup.", "DNS and streaming often use UDP when speed matters."],
    hint: "Ask whether the service needs guaranteed ordered delivery.",
    trap: "UDP is not always wrong; it is a different tradeoff."
  },
  dns: {
    title: "DNS maps names to useful records",
    objective: "Match DNS record types to what a client needs to find.",
    points: ["A and AAAA map names to IP addresses.", "CNAME creates an alias.", "MX identifies mail exchangers."],
    hint: "Look for whether the prompt asks for an address, alias, mail route, or name server.",
    trap: "A CNAME is an alias, not the final IPv4 address."
  },
  apache: {
    title: "Apache serves sites from config",
    objective: "Recognize service control, config tests, document roots, and virtual hosts.",
    points: ["`apachectl configtest` checks syntax.", "A virtual host maps names or ports to site config.", "The document root is where served files live."],
    hint: "Separate service management from web-site configuration.",
    trap: "Restarting before a config test can turn a syntax mistake into downtime."
  },
  networks: {
    title: "IPv4 ranges reveal intent",
    objective: "Recognize loopback, private ranges, and older classful network ranges.",
    points: ["127.0.0.0/8 is loopback.", "10/8, 172.16/12, and 192.168/16 are private.", "Class A starts 1-126, B starts 128-191, C starts 192-223."],
    hint: "Check the first octet, then ask whether the address is private or public.",
    trap: "127.x.x.x is loopback, not a normal Class A host range for use on the LAN."
  },
  scripting: {
    title: "Shell scripts combine commands with control flow",
    objective: "Read scripts by following variables, tests, loops, and exit status.",
    points: ["`$?` stores the last exit status.", "`if` branches on command success.", "`case` matches one input against patterns."],
    hint: "Trace one small input through the script before generalizing.",
    trap: "A command can print output and still fail; exit status is separate."
  }
};

export const RANKS = [
  { level: 1, name: "Terminal Trainee" },
  { level: 3, name: "Shell Operator" },
  { level: 5, name: "Permission Adept" },
  { level: 8, name: "Network Analyst" },
  { level: 11, name: "Service Captain" },
  { level: 14, name: "Security Sentinel" },
  { level: 18, name: "Root Candidate" },
  { level: 22, name: "Exam Commander" }
];

export const BADGES = [
  { id: "first-login", name: "First Login", detail: "Answer one challenge." },
  { id: "five-streak", name: "Five Clean", detail: "Reach a 5-answer streak." },
  { id: "ten-streak", name: "Ten Clean", detail: "Reach a 10-answer streak." },
  { id: "command-line", name: "Command Line", detail: "Clear 10 command drills." },
  { id: "port-watch", name: "Port Watch", detail: "Clear 10 port drills." },
  { id: "perm-forge", name: "Permission Forge", detail: "Clear 10 permission drills." },
  { id: "level-five", name: "Level 5", detail: "Reach Level 5." },
  { id: "level-ten", name: "Level 10", detail: "Reach Level 10." },
  { id: "boss-clear", name: "Boss Clear", detail: "Pass one boss exam." },
  { id: "full-map", name: "Full Map", detail: "Answer every topic at least once." }
];

export const PORTS = [
  { service: "FTP data", port: "20", protocol: "TCP" },
  { service: "FTP control", port: "21", protocol: "TCP" },
  { service: "SSH and SFTP", port: "22", protocol: "TCP" },
  { service: "Telnet", port: "23", protocol: "TCP" },
  { service: "SMTP", port: "25", protocol: "TCP" },
  { service: "DNS", port: "53", protocol: "UDP and TCP" },
  { service: "DHCP server", port: "67", protocol: "UDP" },
  { service: "DHCP client", port: "68", protocol: "UDP" },
  { service: "TFTP", port: "69", protocol: "UDP" },
  { service: "HTTP", port: "80", protocol: "TCP" },
  { service: "POP3", port: "110", protocol: "TCP" },
  { service: "NTP", port: "123", protocol: "UDP" },
  { service: "IMAP", port: "143", protocol: "TCP" },
  { service: "SNMP", port: "161/162", protocol: "UDP" },
  { service: "LDAP", port: "389", protocol: "TCP" },
  { service: "LDAPS", port: "636", protocol: "TCP" },
  { service: "HTTPS", port: "443", protocol: "TCP" },
  { service: "SMB/CIFS", port: "445", protocol: "TCP" },
  { service: "Syslog", port: "514", protocol: "UDP" },
  { service: "SMTPS", port: "465/587", protocol: "TCP" },
  { service: "IMAPS", port: "993", protocol: "TCP" },
  { service: "POP3S", port: "995", protocol: "TCP" },
  { service: "MySQL", port: "3306", protocol: "TCP" },
  { service: "RDP", port: "3389", protocol: "TCP" },
  { service: "PostgreSQL", port: "5432", protocol: "TCP" },
  { service: "HTTP alternate", port: "8080", protocol: "TCP" }
];

export const COMMAND_DRILLS = [
  {
    topic: "commands",
    prompt: "Print the current working directory.",
    accepted: ["pwd"],
    answer: "pwd",
    explain: "`pwd` prints the shell's current directory.",
    difficulty: 1
  },
  {
    topic: "commands",
    prompt: "List all files, including hidden files, in long format.",
    accepted: ["ls -la", "ls -al"],
    answer: "ls -la",
    explain: "`-l` gives long format and `-a` includes dotfiles.",
    difficulty: 1
  },
  {
    topic: "commands",
    prompt: "Create `/opt/review/notes` and any missing parent directories.",
    accepted: ["mkdir -p /opt/review/notes"],
    answer: "mkdir -p /opt/review/notes",
    explain: "`mkdir -p` creates parent directories as needed.",
    difficulty: 1
  },
  {
    topic: "commands",
    prompt: "Copy `/etc/hosts` to `/tmp/hosts.bak`.",
    accepted: ["cp /etc/hosts /tmp/hosts.bak"],
    answer: "cp /etc/hosts /tmp/hosts.bak",
    explain: "The usual pattern is command, source, destination.",
    difficulty: 1
  },
  {
    topic: "commands",
    prompt: "Move `oldname.txt` to `newname.txt`.",
    accepted: ["mv oldname.txt newname.txt"],
    answer: "mv oldname.txt newname.txt",
    explain: "`mv` renames when source and destination are in the same directory.",
    difficulty: 1
  },
  {
    topic: "commands",
    prompt: "Remove `scratch` and everything under it.",
    accepted: ["rm -rf scratch", "rm -r -f scratch"],
    answer: "rm -rf scratch",
    explain: "`rm -rf` recursively forces removal; it is powerful and dangerous.",
    difficulty: 2
  },
  {
    topic: "commands",
    prompt: "Create a symbolic link named `latest` that points to `/var/log/syslog`.",
    accepted: ["ln -s /var/log/syslog latest"],
    answer: "ln -s /var/log/syslog latest",
    explain: "`ln -s target linkname` creates a symbolic link.",
    difficulty: 2
  },
  {
    topic: "commands",
    prompt: "Show the last 20 lines of `/var/log/auth.log`.",
    accepted: ["tail -20 /var/log/auth.log", "tail -n 20 /var/log/auth.log"],
    answer: "tail -n 20 /var/log/auth.log",
    explain: "`tail -n 20` shows the final 20 lines.",
    difficulty: 1
  },
  {
    topic: "commands",
    prompt: "Follow new lines appended to `/var/log/syslog`.",
    accepted: ["tail -f /var/log/syslog"],
    answer: "tail -f /var/log/syslog",
    explain: "`tail -f` follows a growing log file.",
    difficulty: 1
  },
  {
    topic: "commands",
    prompt: "Find regular files under `/etc` whose names end in `.conf`.",
    accepted: ["find /etc -type f -name '*.conf'", "find /etc -name '*.conf' -type f"],
    answer: "find /etc -type f -name '*.conf'",
    explain: "`find` combines path, tests, and actions.",
    difficulty: 2
  },
  {
    topic: "commands",
    prompt: "Search recursively for `Listen` under `/etc/httpd` and show line numbers.",
    accepted: ["grep -rn Listen /etc/httpd", "grep -nr Listen /etc/httpd"],
    answer: "grep -rn Listen /etc/httpd",
    explain: "`-r` searches recursively and `-n` prints line numbers.",
    difficulty: 2
  },
  {
    topic: "permissions",
    prompt: "Set `script.sh` to owner read/write/execute and group/other read/execute.",
    accepted: ["chmod 755 script.sh"],
    answer: "chmod 755 script.sh",
    explain: "755 is `rwxr-xr-x`.",
    difficulty: 1
  },
  {
    topic: "permissions",
    prompt: "Add execute permission for the owner of `script.sh` using symbolic mode.",
    accepted: ["chmod u+x script.sh"],
    answer: "chmod u+x script.sh",
    explain: "`u+x` adds owner execute without changing other permissions.",
    difficulty: 1
  },
  {
    topic: "permissions",
    prompt: "Change owner of `report.txt` to user `alex` and group `admins`.",
    accepted: ["chown alex:admins report.txt"],
    answer: "chown alex:admins report.txt",
    explain: "`chown user:group file` can set both owner and group.",
    difficulty: 2
  },
  {
    topic: "accounts",
    prompt: "Add user `alex` to supplemental group `wheel` without removing existing groups.",
    accepted: ["usermod -aG wheel alex"],
    answer: "usermod -aG wheel alex",
    explain: "`-aG` appends to supplemental groups.",
    difficulty: 2
  },
  {
    topic: "accounts",
    prompt: "Change the password for user `alex`.",
    accepted: ["passwd alex"],
    answer: "passwd alex",
    explain: "`passwd user` changes that user's password when run with privilege.",
    difficulty: 1
  },
  {
    topic: "monitoring",
    prompt: "Show disk usage for mounted filesystems in human-readable units.",
    accepted: ["df -h"],
    answer: "df -h",
    explain: "`df -h` summarizes filesystem free space.",
    difficulty: 1
  },
  {
    topic: "monitoring",
    prompt: "Show human-readable size of `/var/log` as a summary.",
    accepted: ["du -sh /var/log"],
    answer: "du -sh /var/log",
    explain: "`du -sh` gives one human-readable total.",
    difficulty: 1
  },
  {
    topic: "monitoring",
    prompt: "Show listening TCP/UDP sockets with process names.",
    accepted: ["ss -tulpn", "netstat -tulpn"],
    answer: "ss -tulpn",
    explain: "`ss -tulpn` is the modern socket inspection command.",
    difficulty: 2
  },
  {
    topic: "init",
    prompt: "Show whether `apache2` is running under systemd.",
    accepted: ["systemctl status apache2"],
    answer: "systemctl status apache2",
    explain: "`systemctl status service` reports state, logs, and process data.",
    difficulty: 1
  },
  {
    topic: "init",
    prompt: "Enable `httpd` to start at boot.",
    accepted: ["systemctl enable httpd"],
    answer: "systemctl enable httpd",
    explain: "`enable` affects boot startup; `start` affects the current boot.",
    difficulty: 1
  },
  {
    topic: "init",
    prompt: "Set the default systemd target to graphical mode.",
    accepted: ["systemctl set-default graphical.target"],
    answer: "systemctl set-default graphical.target",
    explain: "`graphical.target` is the systemd equivalent of classic run level 5.",
    difficulty: 2
  },
  {
    topic: "path",
    prompt: "Append `/opt/tools` to the current shell PATH.",
    accepted: ["export PATH=$PATH:/opt/tools", "export PATH=${PATH}:/opt/tools"],
    answer: "export PATH=$PATH:/opt/tools",
    explain: "Appending keeps existing directories ahead of the new one.",
    difficulty: 1
  },
  {
    topic: "path",
    prompt: "Prepend `/opt/tools` to the current shell PATH.",
    accepted: ["export PATH=/opt/tools:$PATH", "export PATH=/opt/tools:${PATH}"],
    answer: "export PATH=/opt/tools:$PATH",
    explain: "Prepending gives the new directory higher search priority.",
    difficulty: 1
  },
  {
    topic: "cron",
    prompt: "List the current user's crontab.",
    accepted: ["crontab -l"],
    answer: "crontab -l",
    explain: "`crontab -l` lists entries for the current user.",
    difficulty: 1
  },
  {
    topic: "cron",
    prompt: "Edit the current user's crontab.",
    accepted: ["crontab -e"],
    answer: "crontab -e",
    explain: "`crontab -e` opens the user's cron table.",
    difficulty: 1
  },
  {
    topic: "dns",
    prompt: "Query DNS for the A record of `example.com` using `dig`.",
    accepted: ["dig example.com A", "dig A example.com"],
    answer: "dig example.com A",
    explain: "`dig` asks DNS questions and shows detailed answers.",
    difficulty: 1
  },
  {
    topic: "apache",
    prompt: "Run an Apache config syntax test on Debian/Ubuntu.",
    accepted: ["apachectl configtest", "apache2ctl configtest"],
    answer: "apachectl configtest",
    explain: "`apachectl configtest` validates configuration before restart.",
    difficulty: 2
  },
  {
    topic: "scripting",
    prompt: "Make `backup.sh` executable.",
    accepted: ["chmod +x backup.sh", "chmod u+x backup.sh"],
    answer: "chmod +x backup.sh",
    explain: "Executable permission is needed for `./backup.sh`.",
    difficulty: 1
  },
  {
    topic: "scripting",
    prompt: "Run `backup.sh` from the current directory.",
    accepted: ["./backup.sh"],
    answer: "./backup.sh",
    explain: "`./` tells the shell to execute a file in the current directory.",
    difficulty: 1
  },
  {
    topic: "streams",
    prompt: "Redirect stdout from `date` to `/tmp/now.txt`, replacing the file.",
    accepted: ["date > /tmp/now.txt"],
    answer: "date > /tmp/now.txt",
    explain: "`>` redirects stdout and truncates the destination.",
    difficulty: 1
  },
  {
    topic: "streams",
    prompt: "Append stdout from `date` to `/tmp/now.txt`.",
    accepted: ["date >> /tmp/now.txt"],
    answer: "date >> /tmp/now.txt",
    explain: "`>>` appends stdout.",
    difficulty: 1
  },
  {
    topic: "streams",
    prompt: "Redirect stderr from `find /root -name x` to `/tmp/errors.log`.",
    accepted: ["find /root -name x 2> /tmp/errors.log"],
    answer: "find /root -name x 2> /tmp/errors.log",
    explain: "`2>` redirects file descriptor 2, stderr.",
    difficulty: 2
  },
  {
    topic: "streams",
    prompt: "Redirect both stdout and stderr from `job.sh` to `/tmp/job.log`.",
    accepted: ["./job.sh > /tmp/job.log 2>&1", "./job.sh &> /tmp/job.log"],
    answer: "./job.sh > /tmp/job.log 2>&1",
    explain: "Order matters: redirect stdout first, then point stderr at stdout.",
    difficulty: 3
  }
];

export const QUESTION_BANK = [
  {
    id: "cmd-source-dest",
    topic: "commands",
    type: "choice",
    prompt: "In the course mental model `whatToDo -> fromWhere -> toWhere`, which command follows that pattern for copying `/etc/hosts` to `/tmp/hosts`?",
    choices: ["cp /tmp/hosts /etc/hosts", "cp /etc/hosts /tmp/hosts", "mv /etc/hosts /tmp/hosts", "cat /etc/hosts /tmp/hosts"],
    answer: 1,
    explain: "`cp source destination` copies from the source path to the destination path.",
    difficulty: 1
  },
  {
    id: "cmd-ls-inode",
    topic: "commands",
    type: "choice",
    prompt: "Which `ls` option shows inode numbers?",
    choices: ["-a", "-h", "-i", "-R"],
    answer: 2,
    explain: "`ls -i` prints each file's inode number.",
    difficulty: 1
  },
  {
    id: "cmd-file",
    topic: "commands",
    type: "choice",
    prompt: "Which command identifies whether a path is text, binary, image data, or another file format?",
    choices: ["type", "file", "which", "stat"],
    answer: 1,
    explain: "`file` inspects content and metadata to report file type.",
    difficulty: 1
  },
  {
    id: "cmd-which-type",
    topic: "commands",
    type: "choice",
    prompt: "Which command can report that `cd` is a shell builtin instead of an external executable?",
    choices: ["which", "type", "whereis", "locate"],
    answer: 1,
    explain: "`type` knows about aliases, keywords, functions, builtins, and files.",
    difficulty: 2
  },
  {
    id: "cmd-find-exec",
    topic: "commands",
    type: "choice",
    prompt: "Which `find` predicate searches for files modified within the last day?",
    choices: ["-mtime -1", "-user -1", "-perm -1", "-name -1"],
    answer: 0,
    explain: "`-mtime -1` means modification time less than one day ago.",
    difficulty: 2
  },
  {
    id: "streams-fd",
    topic: "streams",
    type: "choice",
    prompt: "Which file descriptor number is STDERR?",
    choices: ["0", "1", "2", "3"],
    answer: 2,
    explain: "STDIN is 0, STDOUT is 1, and STDERR is 2.",
    difficulty: 1
  },
  {
    id: "streams-order",
    topic: "streams",
    type: "choice",
    prompt: "What is the classic trap in `cmd 2>&1 > /tmp/out`?",
    choices: ["It sends stderr to the terminal and stdout to the file.", "It appends both streams.", "It redirects stdin.", "It cannot run in bash."],
    answer: 0,
    explain: "Redirections are processed left to right. STDERR is pointed at the current STDOUT before STDOUT moves to the file.",
    difficulty: 3
  },
  {
    id: "streams-tee",
    topic: "streams",
    type: "choice",
    prompt: "Which operator lets output continue down a pipeline while also writing a copy to a file?",
    choices: ["cat", "tee", "tr", "cut"],
    answer: 1,
    explain: "`tee` writes to stdout and one or more files.",
    difficulty: 1
  },
  {
    id: "perm-order",
    topic: "permissions",
    type: "choice",
    prompt: "When Linux checks permissions, which order is used?",
    choices: ["group, owner, other", "owner, group, other", "other, group, owner", "owner, other, group"],
    answer: 1,
    explain: "The system first checks ownership, then group membership, then everyone else.",
    difficulty: 1
  },
  {
    id: "perm-754",
    topic: "permissions",
    type: "choice",
    prompt: "Which symbolic mode matches octal `754`?",
    choices: ["rwxr-xr--", "rwxrw-r--", "rw-r-xr--", "rwxr--r-x"],
    answer: 0,
    explain: "7 is rwx, 5 is r-x, and 4 is r--.",
    difficulty: 1
  },
  {
    id: "perm-sticky",
    topic: "permissions",
    type: "choice",
    prompt: "What does the sticky bit on a directory like `/tmp` do?",
    choices: ["Forces new files to inherit group ownership.", "Lets only file owners or root delete files in that directory.", "Runs files as their owner.", "Makes every file executable."],
    answer: 1,
    explain: "Sticky directories allow shared writes while protecting users from deleting each other's files.",
    difficulty: 2
  },
  {
    id: "perm-sgid-dir",
    topic: "permissions",
    type: "choice",
    prompt: "What is the directory effect of SGID?",
    choices: ["New files inherit the directory's group.", "New files inherit the directory's owner.", "Only root can delete files.", "Every command runs as root."],
    answer: 0,
    explain: "SGID on directories is useful for shared project group ownership.",
    difficulty: 2
  },
  {
    id: "perm-capital-s",
    topic: "permissions",
    type: "choice",
    prompt: "In `rwSr-xr-x`, what does capital `S` indicate?",
    choices: ["SUID is set but owner execute is not set.", "SGID is set and executable.", "Sticky bit is set but executable is not set.", "The file is a socket."],
    answer: 0,
    explain: "A capital special-bit letter means the bit is set but the matching execute bit is missing.",
    difficulty: 3
  },
  {
    id: "least-privilege",
    topic: "permissions",
    type: "choice",
    prompt: "Which action best matches least privilege?",
    choices: ["Run every service as root.", "Grant only the permissions needed for a task.", "Put every user in the admin group.", "Make project directories world-writable."],
    answer: 1,
    explain: "Least privilege limits rights to the minimum needed, reducing blast radius.",
    difficulty: 1
  },
  {
    id: "arch-web-tier",
    topic: "architecture",
    type: "choice",
    prompt: "In a 3-tier web architecture, where does Apache or Nginx usually sit?",
    choices: ["Presentation/web tier in the DMZ", "Application tier only", "Data tier only", "Backup tier"],
    answer: 0,
    explain: "The web tier serves HTTP traffic and is commonly placed in the DMZ.",
    difficulty: 1
  },
  {
    id: "arch-db-zone",
    topic: "architecture",
    type: "choice",
    prompt: "Which tier should be reachable by the application tier but not directly from the Internet?",
    choices: ["Client tier", "Data tier", "Presentation tier", "DNS root tier"],
    answer: 1,
    explain: "The database belongs in a protected back-end data zone.",
    difficulty: 1
  },
  {
    id: "arch-why-zones",
    topic: "architecture",
    type: "choice",
    prompt: "Why split web, app, and data tiers into different zones?",
    choices: ["To remove the need for logs.", "For defense in depth and blast-radius reduction.", "To avoid using DNS.", "To make all ports public."],
    answer: 1,
    explain: "Segmentation lets firewalls and trust boundaries limit compromise paths.",
    difficulty: 2
  },
  {
    id: "cron-order",
    topic: "cron",
    type: "choice",
    prompt: "What is the correct 5-field order in a user crontab?",
    choices: ["hour minute month dom dow", "minute hour dom month dow", "dom month dow hour minute", "minute dom hour month dow"],
    answer: 1,
    explain: "The order is minute, hour, day of month, month, day of week.",
    difficulty: 1
  },
  {
    id: "cron-every-five",
    topic: "cron",
    type: "choice",
    prompt: "What schedule means every 5 minutes?",
    choices: ["5 * * * *", "*/5 * * * *", "* */5 * * *", "0 5 * * *"],
    answer: 1,
    explain: "`*/5` in the minute field means every five minutes.",
    difficulty: 1
  },
  {
    id: "cron-sunday",
    topic: "cron",
    type: "choice",
    prompt: "Which day-of-week values can mean Sunday in cron?",
    choices: ["0 and 7", "1 and 7", "5 and 6", "Only 1"],
    answer: 0,
    explain: "Both 0 and 7 are commonly accepted as Sunday.",
    difficulty: 1
  },
  {
    id: "cron-root-user",
    topic: "cron",
    type: "choice",
    prompt: "Which crontab option lets root edit another user's crontab?",
    choices: ["-a", "-u", "-p", "-x"],
    answer: 1,
    explain: "`crontab -u user -e` targets another user's crontab.",
    difficulty: 2
  },
  {
    id: "init-runlevel-0",
    topic: "init",
    type: "choice",
    prompt: "Classic SysV run level 0 means what?",
    choices: ["Reboot", "Single-user", "Graphical multi-user", "Halt"],
    answer: 3,
    explain: "Run level 0 halts or powers off the system.",
    difficulty: 1
  },
  {
    id: "init-runlevel-5",
    topic: "init",
    type: "choice",
    prompt: "Classic SysV run level 5 usually means what?",
    choices: ["Multi-user GUI", "Halt", "Single-user rescue", "Reboot"],
    answer: 0,
    explain: "Run level 5 is the graphical multi-user target on classic Red Hat-style systems.",
    difficulty: 1
  },
  {
    id: "init-runlevel-6",
    topic: "init",
    type: "choice",
    prompt: "Classic SysV run level 6 means what?",
    choices: ["Halt", "Reboot", "Unused", "No networking"],
    answer: 1,
    explain: "Run level 6 reboots the host.",
    difficulty: 1
  },
  {
    id: "init-systemd-3",
    topic: "init",
    type: "choice",
    prompt: "Which systemd target is the usual equivalent of run level 3?",
    choices: ["graphical.target", "multi-user.target", "poweroff.target", "reboot.target"],
    answer: 1,
    explain: "`multi-user.target` maps to full multi-user CLI mode.",
    difficulty: 1
  },
  {
    id: "init-case-default",
    topic: "init",
    type: "choice",
    prompt: "In a SysV init script `case \"$1\" in ... *) ... ;; esac`, what does `*)` catch?",
    choices: ["Only start", "Only stop", "Any unmatched argument", "Only empty input"],
    answer: 2,
    explain: "`*` is the default pattern in the case statement.",
    difficulty: 2
  },
  {
    id: "files-regular",
    topic: "files",
    type: "choice",
    prompt: "In the first character of `ls -l`, what does `-` mean?",
    choices: ["Regular file", "Directory", "Symbolic link", "Block device"],
    answer: 0,
    explain: "A leading dash identifies a regular file.",
    difficulty: 1
  },
  {
    id: "files-link",
    topic: "files",
    type: "choice",
    prompt: "In the first character of `ls -l`, what does `l` mean?",
    choices: ["Directory", "Symbolic link", "Character device", "Regular file"],
    answer: 1,
    explain: "`l` marks a symbolic link.",
    difficulty: 1
  },
  {
    id: "files-block",
    topic: "files",
    type: "choice",
    prompt: "Which leading `ls -l` character identifies a block device like `/dev/sda`?",
    choices: ["c", "b", "d", "l"],
    answer: 1,
    explain: "Block devices use buffered fixed-size block I/O.",
    difficulty: 1
  },
  {
    id: "files-char",
    topic: "files",
    type: "choice",
    prompt: "Which leading `ls -l` character identifies a character device like `/dev/tty`?",
    choices: ["c", "b", "d", "-"],
    answer: 0,
    explain: "Character devices handle streams character by character.",
    difficulty: 1
  },
  {
    id: "path-purpose",
    topic: "path",
    type: "choice",
    prompt: "What is `PATH`?",
    choices: ["A colon-separated list of executable search directories.", "The current directory only.", "A file descriptor table.", "The kernel routing table."],
    answer: 0,
    explain: "The shell searches each PATH directory for executable commands.",
    difficulty: 1
  },
  {
    id: "path-dot",
    topic: "path",
    type: "choice",
    prompt: "Why is putting `.` in PATH risky?",
    choices: ["It disables shell builtins.", "It can run a Trojan executable from the current directory.", "It prevents absolute paths.", "It blocks sudo."],
    answer: 1,
    explain: "An attacker can place a command with a trusted name in the current directory.",
    difficulty: 2
  },
  {
    id: "monitor-top",
    topic: "monitoring",
    type: "choice",
    prompt: "Which tool gives an interactive view of processes and CPU/memory activity?",
    choices: ["top", "df", "lsblk", "cal"],
    answer: 0,
    explain: "`top` updates process and resource information interactively.",
    difficulty: 1
  },
  {
    id: "monitor-logs-debian-auth",
    topic: "monitoring",
    type: "choice",
    prompt: "On Debian/Ubuntu, which log commonly records authentication events?",
    choices: ["/var/log/auth.log", "/var/log/httpd/access_log", "/var/log/cron", "/etc/passwd"],
    answer: 0,
    explain: "Debian-family systems commonly log auth events in `/var/log/auth.log`.",
    difficulty: 2
  },
  {
    id: "monitor-journal",
    topic: "monitoring",
    type: "choice",
    prompt: "Which command queries systemd's journal?",
    choices: ["journalctl", "dmesg", "last", "free"],
    answer: 0,
    explain: "`journalctl` reads systemd journal entries.",
    difficulty: 1
  },
  {
    id: "accounts-passwd-fields",
    topic: "accounts",
    type: "choice",
    prompt: "How many colon-separated fields are in `/etc/passwd`?",
    choices: ["4", "5", "7", "9"],
    answer: 2,
    explain: "`/etc/passwd` has seven fields.",
    difficulty: 1
  },
  {
    id: "accounts-passwd-uid",
    topic: "accounts",
    type: "choice",
    prompt: "In `/etc/passwd`, which UID belongs to root?",
    choices: ["0", "1", "1000", "65534"],
    answer: 0,
    explain: "UID 0 has root privileges.",
    difficulty: 1
  },
  {
    id: "accounts-passwd-x",
    topic: "accounts",
    type: "choice",
    prompt: "In `/etc/passwd`, what does `x` in the password field usually mean?",
    choices: ["The account has no password.", "The real hash is stored in `/etc/shadow`.", "The user is expired.", "The shell is locked."],
    answer: 1,
    explain: "Modern systems keep password hashes in shadow files.",
    difficulty: 1
  },
  {
    id: "accounts-shadow-lock",
    topic: "accounts",
    type: "choice",
    prompt: "In `/etc/shadow`, what can `!` or `*` in the password field indicate?",
    choices: ["Locked login password", "Expired hostname", "Empty group", "Root UID"],
    answer: 0,
    explain: "`!` and `*` commonly prevent password login for that account.",
    difficulty: 2
  },
  {
    id: "accounts-group-fields",
    topic: "accounts",
    type: "choice",
    prompt: "How many fields are in `/etc/group`?",
    choices: ["3", "4", "7", "8"],
    answer: 1,
    explain: "Group name, password placeholder, GID, and member list.",
    difficulty: 1
  },
  {
    id: "ports-ranges",
    topic: "ports",
    type: "choice",
    prompt: "Which range contains well-known ports?",
    choices: ["0-1023", "1024-49151", "49152-65535", "65536-99999"],
    answer: 0,
    explain: "Well-known ports are 0 through 1023.",
    difficulty: 1
  },
  {
    id: "ports-verify",
    topic: "ports",
    type: "choice",
    prompt: "Which command verifies whether port 443 is accepting TCP connections on `example.com`?",
    choices: ["nc -zv example.com 443", "chmod 443 example.com", "df -h example.com", "crontab -l 443"],
    answer: 0,
    explain: "`nc -zv host port` performs a zero-I/O TCP connect scan.",
    difficulty: 1
  },
  {
    id: "ports-lsof",
    topic: "ports",
    type: "choice",
    prompt: "Which command can show processes using local port 80?",
    choices: ["lsof -i :80", "free -h :80", "id :80", "umask :80"],
    answer: 0,
    explain: "`lsof -i :PORT` lists open network files for that port.",
    difficulty: 2
  },
  {
    id: "osi-order",
    topic: "osi",
    type: "choice",
    prompt: "Which is OSI layer 4?",
    choices: ["Network", "Transport", "Session", "Data Link"],
    answer: 1,
    explain: "Layer 4 is Transport: TCP and UDP.",
    difficulty: 1
  },
  {
    id: "osi-layer7",
    topic: "osi",
    type: "choice",
    prompt: "Which protocol belongs at OSI Application layer in the course model?",
    choices: ["HTTP", "Ethernet", "IP", "MAC"],
    answer: 0,
    explain: "HTTP is a layer 7 application protocol.",
    difficulty: 1
  },
  {
    id: "osi-layer2",
    topic: "osi",
    type: "choice",
    prompt: "Which item is most closely associated with OSI layer 2?",
    choices: ["MAC address", "TCP port", "IP address", "TLS certificate"],
    answer: 0,
    explain: "Layer 2 uses frames and physical addresses like MAC addresses.",
    difficulty: 1
  },
  {
    id: "osi-tcpip-map",
    topic: "osi",
    type: "choice",
    prompt: "In the TCP/IP 4-layer model, OSI layers 5-7 map mainly to which layer?",
    choices: ["Application", "Transport", "Internet", "Link"],
    answer: 0,
    explain: "Session, Presentation, and Application collapse into TCP/IP Application.",
    difficulty: 2
  },
  {
    id: "webflow-first",
    topic: "webflow",
    type: "choice",
    prompt: "After browser cache checks, what usually happens before connecting to `https://example.com`?",
    choices: ["DNS resolution", "HTTP GET response", "Database write", "Cron dispatch"],
    answer: 0,
    explain: "The browser needs an IP address before opening a TCP connection.",
    difficulty: 1
  },
  {
    id: "webflow-handshake",
    topic: "webflow",
    type: "choice",
    prompt: "What is the correct TCP three-way handshake order?",
    choices: ["ACK, SYN, SYN-ACK", "SYN, SYN-ACK, ACK", "SYN-ACK, SYN, ACK", "FIN, ACK, FIN"],
    answer: 1,
    explain: "The client sends SYN, the server replies SYN-ACK, then the client sends ACK.",
    difficulty: 1
  },
  {
    id: "webflow-tls",
    topic: "webflow",
    type: "choice",
    prompt: "For HTTPS, what happens after TCP is established and before the HTTP request?",
    choices: ["TLS handshake", "Filesystem check", "Cron parse", "Run level switch"],
    answer: 0,
    explain: "TLS handles certificate exchange and key agreement over the TCP socket.",
    difficulty: 1
  },
  {
    id: "tcpudp-reliable",
    topic: "tcpudp",
    type: "choice",
    prompt: "Which transport protocol provides ACKs, retransmission, and in-order delivery?",
    choices: ["TCP", "UDP", "ICMP", "ARP"],
    answer: 0,
    explain: "TCP is reliable and connection-oriented.",
    difficulty: 1
  },
  {
    id: "tcpudp-header",
    topic: "tcpudp",
    type: "choice",
    prompt: "What is UDP's minimum header size?",
    choices: ["8 bytes", "20 bytes", "53 bytes", "443 bytes"],
    answer: 0,
    explain: "UDP has an 8-byte header, which is smaller than TCP's 20-byte minimum.",
    difficulty: 2
  },
  {
    id: "tcpudp-dhcp",
    topic: "tcpudp",
    type: "choice",
    prompt: "Which protocol is normally used by DHCP?",
    choices: ["UDP", "TCP", "SCTP", "TLS"],
    answer: 0,
    explain: "DHCP uses UDP ports 67 and 68.",
    difficulty: 1
  },
  {
    id: "dns-record-a",
    topic: "dns",
    type: "choice",
    prompt: "Which DNS record maps a hostname to an IPv4 address?",
    choices: ["A", "AAAA", "MX", "PTR"],
    answer: 0,
    explain: "An A record maps a name to IPv4.",
    difficulty: 1
  },
  {
    id: "dns-record-ptr",
    topic: "dns",
    type: "choice",
    prompt: "Which DNS record supports reverse lookup from IP address to name?",
    choices: ["PTR", "TXT", "SOA", "CNAME"],
    answer: 0,
    explain: "PTR records are used for reverse DNS.",
    difficulty: 1
  },
  {
    id: "dns-hierarchy",
    topic: "dns",
    type: "choice",
    prompt: "Which DNS hierarchy order is correct?",
    choices: ["host, authoritative, TLD, root", "root, TLD, authoritative, host", "TLD, host, root, authoritative", "authoritative, root, host, TLD"],
    answer: 1,
    explain: "DNS descends from root to TLD to authoritative zone to host record.",
    difficulty: 2
  },
  {
    id: "dns-hosts",
    topic: "dns",
    type: "choice",
    prompt: "Which local file can override name resolution before DNS, depending on `nsswitch.conf`?",
    choices: ["/etc/hosts", "/etc/group", "/etc/shadow", "/var/log/syslog"],
    answer: 0,
    explain: "`/etc/hosts` is a local hostname-to-address map.",
    difficulty: 1
  },
  {
    id: "dns-port",
    topic: "dns",
    type: "choice",
    prompt: "What is DNS's default port?",
    choices: ["22", "53", "80", "443"],
    answer: 1,
    explain: "DNS uses 53/UDP for many queries and 53/TCP for zone transfers and large responses.",
    difficulty: 1
  },
  {
    id: "apache-rhel",
    topic: "apache",
    type: "choice",
    prompt: "On RHEL-family systems, what is Apache commonly called as a service?",
    choices: ["httpd", "apache2", "nginxd", "webd"],
    answer: 0,
    explain: "RHEL commonly uses the `httpd` service name.",
    difficulty: 1
  },
  {
    id: "apache-debian-sites",
    topic: "apache",
    type: "choice",
    prompt: "On Debian/Ubuntu, which command enables an Apache site?",
    choices: ["a2ensite", "a2dissite", "a2enmod", "httpd -t"],
    answer: 0,
    explain: "`a2ensite` enables a site config from `sites-available`.",
    difficulty: 2
  },
  {
    id: "apache-docroot",
    topic: "apache",
    type: "choice",
    prompt: "Which Apache directive points to the directory containing files to serve?",
    choices: ["DocumentRoot", "Listen", "ServerName", "CustomLog"],
    answer: 0,
    explain: "`DocumentRoot` names the root directory for served content.",
    difficulty: 1
  },
  {
    id: "apache-listen",
    topic: "apache",
    type: "choice",
    prompt: "Which Apache directive selects the port to accept HTTP connections on?",
    choices: ["Listen", "Require", "Options", "ErrorLog"],
    answer: 0,
    explain: "`Listen 80` binds Apache to port 80.",
    difficulty: 1
  },
  {
    id: "net-class-a",
    topic: "networks",
    type: "choice",
    prompt: "What class is `10.14.8.9` in legacy classful IPv4?",
    choices: ["Class A", "Class B", "Class C", "Class D"],
    answer: 0,
    explain: "Class A covers first octets 1 through 126.",
    difficulty: 1
  },
  {
    id: "net-class-b",
    topic: "networks",
    type: "choice",
    prompt: "What class is `172.20.1.5` in legacy classful IPv4?",
    choices: ["Class A", "Class B", "Class C", "Class D"],
    answer: 1,
    explain: "Class B covers first octets 128 through 191.",
    difficulty: 1
  },
  {
    id: "net-class-c",
    topic: "networks",
    type: "choice",
    prompt: "What class is `192.168.1.10` in legacy classful IPv4?",
    choices: ["Class A", "Class B", "Class C", "Class D"],
    answer: 2,
    explain: "Class C covers first octets 192 through 223.",
    difficulty: 1
  },
  {
    id: "net-loopback",
    topic: "networks",
    type: "choice",
    prompt: "Which IPv4 range is loopback/localhost?",
    choices: ["127.0.0.0/8", "169.254.0.0/16", "224.0.0.0/4", "10.0.0.0/8"],
    answer: 0,
    explain: "127.0.0.0/8 never leaves the host; 127.0.0.1 is localhost.",
    difficulty: 1
  },
  {
    id: "net-apipa",
    topic: "networks",
    type: "choice",
    prompt: "Which range is APIPA/link-local IPv4?",
    choices: ["169.254.0.0/16", "172.16.0.0/12", "192.168.0.0/16", "240.0.0.0/4"],
    answer: 0,
    explain: "169.254.0.0/16 is IPv4 link-local/APIPA.",
    difficulty: 1
  },
  {
    id: "script-shebang",
    topic: "scripting",
    type: "choice",
    prompt: "What should the first line be for a Bash script?",
    choices: ["#!/bin/bash", "#/bin/bash!", "bash#!/bin", "$!/bin/bash"],
    answer: 0,
    explain: "The shebang tells the kernel which interpreter to use.",
    difficulty: 1
  },
  {
    id: "script-var",
    topic: "scripting",
    type: "choice",
    prompt: "Which Bash variable assignment is valid?",
    choices: ["NAME=\"value\"", "NAME = \"value\"", "$NAME=value", "set NAME value"],
    answer: 0,
    explain: "Shell assignments have no spaces around `=`.",
    difficulty: 1
  },
  {
    id: "script-params",
    topic: "scripting",
    type: "choice",
    prompt: "Which shell variable stores the number of positional arguments?",
    choices: ["$0", "$#", "$@", "$?"],
    answer: 1,
    explain: "`$#` is the argument count.",
    difficulty: 1
  },
  {
    id: "script-status",
    topic: "scripting",
    type: "choice",
    prompt: "Which shell variable stores the previous command's exit status?",
    choices: ["$?", "$$", "$1", "$@"],
    answer: 0,
    explain: "`$?` expands to the most recent command's exit status.",
    difficulty: 1
  },
  {
    id: "script-test-file",
    topic: "scripting",
    type: "choice",
    prompt: "Which test checks whether `report.txt` is a regular file?",
    choices: ["[ -f report.txt ]", "[ -d report.txt ]", "[ -x report.txt ]", "[ -z report.txt ]"],
    answer: 0,
    explain: "`-f` checks for a regular file.",
    difficulty: 1
  },
  {
    id: "multi-passwd-order",
    topic: "accounts",
    type: "multi",
    prompt: "Select the fields that appear in `/etc/passwd`.",
    choices: ["username", "UID", "home directory", "TLS certificate"],
    answer: [0, 1, 2],
    explain: "`/etc/passwd` contains username, password placeholder, UID, GID, GECOS, home, and shell.",
    difficulty: 2
  },
  {
    id: "multi-private-ranges",
    topic: "networks",
    type: "multi",
    prompt: "Select the RFC 1918 private IPv4 ranges.",
    choices: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "224.0.0.0/4"],
    answer: [0, 1, 2],
    explain: "224.0.0.0/4 is multicast, not private addressing.",
    difficulty: 2
  },
  {
    id: "multi-dns-records",
    topic: "dns",
    type: "multi",
    prompt: "Select valid DNS record types from the review.",
    choices: ["A", "MX", "PTR", "chmod"],
    answer: [0, 1, 2],
    explain: "A, MX, and PTR are DNS records; `chmod` is a Linux command.",
    difficulty: 1
  },
  {
    id: "multi-special-bits",
    topic: "permissions",
    type: "multi",
    prompt: "Select Linux special permission bits.",
    choices: ["SUID", "SGID", "Sticky bit", "APIPA"],
    answer: [0, 1, 2],
    explain: "SUID, SGID, and sticky are special permission bits.",
    difficulty: 1
  },
  {
    id: "multi-udp-services",
    topic: "ports",
    type: "multi",
    prompt: "Select services commonly associated with UDP in the review list.",
    choices: ["DNS queries", "DHCP", "NTP", "SSH"],
    answer: [0, 1, 2],
    explain: "SSH uses TCP 22; DNS queries, DHCP, and NTP commonly use UDP.",
    difficulty: 2
  }
];
