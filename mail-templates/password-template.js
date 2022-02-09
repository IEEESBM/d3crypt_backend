const passwordTemplate = (name, url, email) => {
  var message = `
  <html>
  <head>
    <style>
      .banner-color {
        background-color: #ffb800;
      }

      .title-color {
        color: #ffb800;
      }

      .button-color {
        background-color: #ffb800;
      }

      @media screen and (min-width: 500px) {
        .banner-color {
          background-color: #ffb800;
        }

        .title-color {
          color: #ffb800;
        }

        .button-color {
          background-color: #ffb800;
        }
      }
    </style>
  </head>

  <body>
    <div
      style="
        background-color: #fff;
        padding: 0;
        margin: 0 auto;
        font-weight: 200;
        width: 100% !important;
      "
    >
      <table
        align="center"
        border="0"
        cellspacing="0"
        cellpadding="0"
        style="
          table-layout: fixed;
          font-weight: 200;
          font-family: Helvetica, Arial, sans-serif;
        "
        width="100%"
      >
        <tbody>
          <tr>
            <td align="center">
              <center style="width: 100%">
                <table
                  bgcolor="#191919"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  style="
                    margin: 0 auto;
                    max-width: 512px;
                    font-weight: 200;
                    width: inherit;
                    font-family: Helvetica, Arial, sans-serif;
                  "
                  width="512"
                >
                  <tbody>
                    <tr>
                      <td
                        bgcolor="#000"
                        width="100%"
                        style="
                          background-color: #121212;
                          padding: 12px;
                          border-bottom: 1px solid #121212;
                        "
                      >
                        <table
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                          style="
                            font-weight: 200;
                            width: 100% !important;
                            font-family: Helvetica, Arial, sans-serif;
                            min-width: 100% !important;
                          "
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td align="left" valign="middle" width="50%">
                                <span
                                  style="
                                    margin: 0;
                                    color: #c0c0c0;
                                    white-space: normal;
                                    display: inline-block;
                                    text-decoration: none;
                                    font-size: 12px;
                                    line-height: 20px;
                                  "
                                  >D3crypt | IEEE SBM</span
                                >
                              </td>
                              <td
                                valign="middle"
                                width="50%"
                                align="right"
                                style="padding: 0 0 0 10px"
                              >
                                <span
                                  style="
                                    margin: 0;
                                    color: #c0c0c0;
                                    white-space: normal;
                                    display: inline-block;
                                    text-decoration: none;
                                    font-size: 12px;
                                    line-height: 20px;
                                  "
                                  id="date"
                                  >${Date().toString().substring(0, 24)}</span
                                >
                              </td>
                              <td width="1">&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="left">
                        <table
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                          style="
                            font-weight: 200;
                            font-family: Helvetica, Arial, sans-serif;
                          "
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td width="100%">
                                <table
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                  style="
                                    font-weight: 200;
                                    font-family: Helvetica, Arial, sans-serif;
                                  "
                                  width="100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        align="center"
                                        bgcolor="#000"
                                        style="padding: 20px 48px; color: #000"
                                        class="banner-color"
                                      >
                                        <table
                                          border="0"
                                          cellspacing="0"
                                          cellpadding="0"
                                          style="
                                            font-weight: 200;
                                            font-family: Helvetica, Arial,
                                              sans-serif;
                                          "
                                          width="100%"
                                        >
                                          <tbody>
                                            <tr>
                                              <td align="center" width="100%">
                                                <h1
                                                  style="
                                                    padding: 0;
                                                    margin: 0;
                                                    color: #000;
                                                    font-weight: 500;
                                                    font-size: 20px;
                                                    line-height: 24px;
                                                  "
                                                >
                                                  Reset your password
                                                </h1>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="center"
                                        style="padding: 20px 0 10px 0"
                                      >
                                        <table
                                          border="0"
                                          cellspacing="0"
                                          cellpadding="0"
                                          style="
                                            font-weight: 200;
                                            font-family: Helvetica, Arial,
                                              sans-serif;
                                          "
                                          width="100%"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                align="center"
                                                width="100%"
                                                style="
                                                  padding: 0 15px;
                                                  text-align: justify;
                                                  color: rgb(255, 255, 255);
                                                  font-size: 12px;
                                                  line-height: 18px;
                                                "
                                              >
                                                <h3
                                                  style="
                                                    font-weight: 600;
                                                    padding: 0px;
                                                    margin: 0px;
                                                    font-size: 16px;
                                                    line-height: 24px;
                                                    text-align: center;
                                                  "
                                                  class="title-color"
                                                >
                                                  Hi ${name},
                                                </h3>
                                                <p
                                                  style="
                                                    margin: 20px 0 30px 0;
                                                    font-size: 15px;
                                                    text-align: center;
                                                  "
                                                >
                                                  Click on the button below to
                                                  reset your password
                                                </p>
                                                <div
                                                  style="
                                                    font-weight: 200;
                                                    text-align: center;
                                                    margin: 25px;
                                                  "
                                                >
                                                  <a
                                                    style="
                                                      padding: 0.6em 1em;
                                                      border-radius: 600px;
                                                      color: #000;
                                                      font-size: 14px;
                                                      text-decoration: none;
                                                      font-weight: bold;
                                                    "
                                                    href="${url}"
                                                    class="button-color"
                                                    >Reset Password</a
                                                  >
                                                </div>
                                                <br />
                                                <p
                                                  style="
                                                    font-weight: 200;
                                                    text-align: center;
                                                    color: #c0c0c0;
                                                  "
                                                >
                                                  Please unmark this mail from
                                                  spam to avoid any further
                                                  issues.
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr></tr>
                                    <tr></tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="left">
                        <table
                          bgcolor="#191919"
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                          style="
                            padding: 0 24px;
                            color: #999999;
                            font-weight: 200;
                            font-family: Helvetica, Arial, sans-serif;
                          "
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td align="center" width="100%">
                                <table
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                  style="
                                    font-weight: 200;
                                    font-family: Helvetica, Arial, sans-serif;
                                  "
                                  width="100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        align="center"
                                        valign="middle"
                                        width="100%"
                                        style="
                                          border-top: 1px solid #d9d9d9;
                                          padding: 12px 0px 20px 0px;
                                          text-align: center;
                                          color: #c0c0c0;
                                          font-weight: 200;
                                          font-size: 12px;
                                          line-height: 18px;
                                        "
                                      >
                                        Regards,
                                        <br /><b>IEEE SBM</b>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" width="100%">
                                <table
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                  style="
                                    font-weight: 200;
                                    font-family: Helvetica, Arial, sans-serif;
                                  "
                                  width="100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        align="center"
                                        style="padding: 0 0 8px 0"
                                        width="100%"
                                      ></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`
  return message;
}

module.exports = passwordTemplate;