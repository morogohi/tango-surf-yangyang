/**
 * 양양 탱고·서핑 워크숍 — 참석/제안 자동 수집 스크립트
 * 신청이 들어오면 (1) 구글 시트에 저장하고 (2) morogohi@gmail.com 으로 메일을 보냅니다.
 *
 * ── 설치 방법 ─────────────────────────────────────────────
 * 1) https://sheets.google.com 에서 새 스프레드시트 만들기 (이름: 양양 워크숍 신청)
 * 2) 상단 메뉴 [확장 프로그램] → [Apps Script] 클릭
 * 3) 기본 코드(myFunction…)를 모두 지우고, 이 파일 내용을 통째로 붙여넣기 → 저장(💾)
 * 4) 우측 상단 [배포] → [새 배포] → 톱니바퀴(유형 선택) → [웹 앱]
 *      - 설명: 워크숍 신청 수집
 *      - 실행 계정: 나(morogohi@gmail.com)
 *      - 액세스 권한: 모든 사용자  ← 꼭 이걸로!
 *    [배포] → 권한 검토/허용 (본인 구글 계정 로그인)
 * 5) 표시되는 [웹 앱 URL] (https://script.google.com/macros/s/..../exec) 복사
 * 6) 그 URL을 웹페이지 index.html 의  const SCRIPT_URL = "..."  안에 붙여넣기
 *    (또는 저에게 URL을 알려주시면 넣어서 다시 배포해 드립니다)
 * ─────────────────────────────────────────────────────────
 */

var NOTIFY_EMAIL = "morogohi@gmail.com";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var now = new Date();
    var stamp = Utilities.formatDate(now, "Asia/Seoul", "yyyy-MM-dd HH:mm");

    if (data.type === "proposal") {
      var ps = sheetOf_(ss, "제안", ["등록시각", "닉네임", "제안내용"]);
      ps.appendRow([stamp, data.who, data.idea]);
      MailApp.sendEmail(NOTIFY_EMAIL,
        "[양양 워크숍] 새 제안 — " + data.who,
        "닉네임: " + data.who + "\n시각: " + stamp + "\n\n제안 내용:\n" + data.idea);
    } else {
      var rs = sheetOf_(ss, "참석신청",
        ["신청시각", "이름", "연락처", "참석일정", "서핑", "탱고", "식사/요청", "메시지"]);
      rs.appendRow([stamp, data.name, data.contact, data.attend,
                    data.surf, data.tango, data.diet, data.message]);
      MailApp.sendEmail(NOTIFY_EMAIL,
        "[양양 워크숍] 참석 신청 — " + data.name,
        "이름: " + data.name +
        "\n연락처: " + data.contact +
        "\n참석일정: " + data.attend +
        "\n서핑: " + data.surf +
        "\n탱고: " + data.tango +
        "\n식사/요청: " + (data.diet || "-") +
        "\n메시지: " + (data.message || "-") +
        "\n신청시각: " + stamp);
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return ContentService.createTextOutput("양양 워크숍 수집 서버 정상 작동 중입니다.");
}

function sheetOf_(ss, name, headers) {
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
