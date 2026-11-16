# Настройка Ubuntu для учебного проекта

## 1. Пакеты и Node.js
```bash
sudo apt update && sudo apt install -y git curl ca-certificates
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install --lts
```

## 2. Docker (официальный репозиторий Docker)
```bash
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER    # потом выйти из сессии и зайти снова
docker run hello-world
```

## 3. Git и GitHub
```bash
git config --global user.name "Alexandra Katushkova"
git config --global user.email "<email, привязанный к GitHub>"
sudo apt install -y gh
gh auth login          # GitHub.com → SSH → создать ключ → войти через браузер
```

## 4. Репозиторий
Вариант А — создать репозиторий из этой заготовки (распакованный архив `playwright-docker-lab`):
```bash
cd ~/playwright-docker-lab
gh repo create playwright-docker-lab --public --source=. --remote=origin --push
```
Вариант Б — репозиторий уже есть на GitHub:
```bash
git clone git@github.com:<login>/playwright-docker-lab.git && cd playwright-docker-lab
```

## 5. Первый запуск
```bash
npm ci
npx playwright install --with-deps chromium
npm run test:chromium
docker compose run --rm tests      # то же в контейнере
```
После `git push` во вкладке Actions на GitHub появится прогон e2e.

## 6. Claude Code и herdr на Ubuntu
```bash
npm install -g @anthropic-ai/claude-code
curl -fsSL https://herdr.dev/install.sh | sh
cd ~/playwright-docker-lab && herdr
```
Панели: 1 — `claude` (ментор по ROADMAP), 2 — терминал для `npm test` / `docker compose`, 3 — `git`.
