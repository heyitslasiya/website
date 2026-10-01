import os

svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E8F0FE"/>
      <stop offset="100%" stop-color="#D2E3FC"/>
    </radialGradient>
  </defs>
  <circle cx="100" cy="100" r="90" fill="url(#bg)" stroke="#93C5FD" stroke-width="4"/>
  <!-- Stitch Ears -->
  <path d="M 40,70 C 15,35 20,85 55,90 C 45,70 60,60 70,70" fill="#5B92E5" stroke="#3B74D1" stroke-width="2"/>
  <path d="M 42,72 C 22,45 27,80 52,85" fill="#F8E1E7"/>
  <path d="M 160,70 C 185,35 180,85 145,90 C 155,70 140,60 130,70" fill="#5B92E5" stroke="#3B74D1" stroke-width="2"/>
  <path d="M 158,72 C 178,45 173,80 148,85" fill="#F8E1E7"/>
  <!-- Head -->
  <ellipse cx="100" cy="95" rx="42" ry="35" fill="#5B92E5" stroke="#3B74D1" stroke-width="2"/>
  <ellipse cx="100" cy="102" rx="24" ry="18" fill="#D6E4FF"/>
  <!-- Eyes -->
  <ellipse cx="86" cy="90" rx="8" ry="10" fill="#1A365D"/>
  <ellipse cx="114" cy="90" rx="8" ry="10" fill="#1A365D"/>
  <circle cx="84" cy="88" r="3" fill="#FFFFFF"/>
  <circle cx="112" cy="88" r="3" fill="#FFFFFF"/>
  <!-- Nose & Mouth -->
  <ellipse cx="100" cy="98" rx="8" ry="5" fill="#2B6CB0"/>
  <path d="M 90,105 Q 100,113 110,105" stroke="#1A365D" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Blanket -->
  <path d="M 50,118 C 50,110 150,110 150,118 C 150,165 50,165 50,118 Z" fill="#F8E1E7" stroke="#E8A3B1" stroke-width="3"/>
  <text x="100" y="145" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#D47488">🧸 Hima</text>
  <!-- Sparkles -->
  <text x="40" y="45" font-size="16" fill="#3B82F6">✨</text>
  <text x="150" y="45" font-size="16" fill="#3B82F6">🌸</text>
</svg>'''

target_path = r'C:\Users\helpdeskteamlead.cbl\.gemini\antigravity\scratch\cozy-care-package\stitch.png'
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(svg_content)
print(f'Stitch asset written to {target_path}')
