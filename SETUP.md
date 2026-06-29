# 양양 탱고·서핑 워크숍 — 운영 가이드

**라이브 주소:** https://morogohi.github.io/tango-surf-yangyang/
**GitHub 저장소:** https://github.com/morogohi/tango-surf-yangyang

---

## ✅ 남은 작업 2가지

### 1. 포스터 이미지 올리기
채팅에 올린 포스터를 `images/poster.jpg` 로 저장한 뒤 아래 명령으로 반영합니다.

```powershell
cd C:\Users\morog\tango-surf-yangyang
git add images/poster.jpg
git commit -m "포스터 이미지 추가"
git push
```
(펜션 사진도 같은 폴더에 `cover.jpg / living.jpg / yard.jpg / terrace.jpg / floorplan.jpg` 로 넣으면 갤러리에 자동 표시)

### 2. 구글 자동수집 연결 (Apps Script)
`apps-script/Code.gs` 파일 맨 위 주석의 설치 방법을 따라 **웹 앱 배포** 후, 받은 URL을
`index.html` 의 `const SCRIPT_URL = "..."` 안에 붙여넣고 push 하면 끝입니다.

```powershell
git add index.html
git commit -m "Apps Script URL 연결"
git push
```
연결 후 신청/제안이 들어오면 **구글 시트 저장 + morogohi@gmail.com 메일 발송**이 자동으로 됩니다.

---

## 페이지 수정 후 반영하는 법
```powershell
cd C:\Users\morog\tango-surf-yangyang
git add -A
git commit -m "수정 내용"
git push
```
push 후 약 1분이면 라이브 주소에 반영됩니다.
