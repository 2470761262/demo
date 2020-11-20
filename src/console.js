/*
 *                   ___====-_  _-====___
 *             _--^^^#####//      \\#####^^^--_
 *          _-^##########// (    ) \\##########^-_
 *         -############//  |\^^/|  \\############-
 *       _/############//   (@::@)   \############\_
 *      /#############((     \\//     ))#############\
 *     -###############\\    (oo)    //###############-
 *    -#################\\  / VV \  //#################-
 *   -###################\\/      \//###################-
 *  _#/|##########/\######(   /\   )######/\##########|\#_
 *  |/ |#/\#/\#/\/  \#/\##\  |  |  /##/\#/  \/\#/\#/\#| \|
 *  `  |/  V  V  `   V  \#\| |  | |/#/  V   '  V  V  \|  '
 *     `   `  `      `   / | |  | | \   '      '  '   '
 *                      (  | |  | |  )
 *                     __\ | |  | | /__
 *                    (vvv(VVV)(VVV)vvv)
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *                神兽保佑            永无BUG
 */

/*
 *           佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
 */

/* eslint-disable no-irregular-whitespace */

// console.log(
//   [
//     "%c  ┌───┐   ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┐",
//     "  │Esc│   │ F1│ F2│ F3│ F4│ │ F5│ F6│ F7│ F8│ │ F9│F10│F11│F12│ │P/S│S L│P/B│  ┌┐    ┌┐    ┌┐",
//     "  └───┘   └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┘  └┘    └┘    └┘",
//     "  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐ ┌───┬───┬───┐ ┌───┬───┬───┬───┐",
//     "  │~ `│! 1│@ 2│# 3│$ 4│% 5│^ 6│& 7│* 8│( 9│) 0│_ -│+ =│ BacSp │ │Ins│Hom│PUp│ │N L│ / │ * │ - │",
//     "  ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤ ├───┼───┼───┤ ├───┼───┼───┼───┤",
//     "  │ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{ [│} ]│ |   │ │Del│End│PDn│ │ 7 │ 8 │ 9 │   │",
//     "  ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤ └───┴───┴───┘ ├───┼───┼───┤ + │",
//     "  │ Caps │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│   │ Enter  │               │ 4 │ 5 │ 6 │   │",
//     "  ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤     ┌───┐     ├───┼───┼───┼───┤",
//     "  │ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│  Shift   │     │ ↑ │     │ 1 │ 2 │ 3 │   │",
//     "  ├─────┬──┴─┬─┴──┬┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤ ┌───┼───┼───┐ ├───┴───┼───┤ E││",
//     "  │ Ctrl│    │Alt │         Space         │ Alt│    │    │Ctrl│ │ ← │ ↓ │ → │ │   0   │ . │←─┘│",
//     "  └─────┴────┴────┴───────────────────────┴────┴────┴────┴────┘ └───┴───┴───┘ └───────┴───┴───┘",
//     " %c                 :iii.       ",
//     "              iSBBQMrYDBQBMJ.         ",
//     "           :gBBBBP      :DBBBQK.                                                                                                                   ",
//     "         iBBBBBB   LKRBKi  YBBBBE                                                                                                                  ",
//     "        ZQBQBBr  gBQB1ruBBv  iQBBBv                       :5BBBBBBBJ.              .:.irrrrirBBBBYirrrrri.:        qBBBQBQBBBBBQBBBBBQBBBg.        ",
//     "       BBQMQQ  JBBBBq EgQBBBJ UBgBBK               :ivSQBBQBRu. :IQBBBBDsr:.      jBQBdDggDgEPSXXDZgDgDbQBBB      BBQB                 QBBB        ",
//     "      BBRgggQJQBdbDQj BRDPPMBBQgMgQBU             KBBBBBXqj:      .:I5PBBBBQ:     MQBB                  .BBB:     BBB5     PBgi    JB1igBBB        ",
//     "     2QQDgDMgBQgii:r  .7r:iPQMgMDggBB.            ..     iPPqBQBBQPPd      :      .rQBBBBBQRZDEDgBBBBBBBBBZ:      BBQQBBQ  BBBBJi  BBBRbQBQ        ",
//     "     BBgggMgRRBBB:.Bg BBu.BBBRMggDgMBP            .qKXPK51IUjZBQBq1221SqK5qY             .iYgBBBBv  . .           BBBKiQBQZBBRBBBvrBBB 2BBQ        ",
//     "    .BRggMRBQBDBB :Bg BB:.BBZBBQMMgRBB            :gIUu5QQJY75QQQsvL5BgU125Z          .rURQBBQgQB..:...iirvj      BBBb .QBQQQ  BBBBQBs DBBQ        ",
//     "    rBQgQBBQi   qBBBg BBBB1   vQBBRgBB            vQq22KBBSu1EBBBSuJdBBU2IdQ.     iQBBBBBZL. UBMB 7BBBBUdgBD      BBBE   QQQg   bBQBg  DBQQ        ",
//     "    :BBBBZ.  KQU  MBP BB5  ZBq  iBBBBB            .1SBBBr7BBBJ:.:qBBQi1BBBuu      .dr:    .7PBgQB. PBBB.          BBQD  sBQBQS  rBgBP  MBBR        ",
//     "     BBP  .gBBPBBi .  .  2EgBPDE  :BBg            jQBDK.  .qMBBQBQgU   :EDBB.      :i7XRBBBQgZQRB.  BBBB          BBB5 2BBQBBB1iBBBQBX PBQQ        ",
//     "     U. :BBBQ::BBBB7   1BQq. ibBBZ  s:            ..  5bQBPI   :   PEBBbr  :      iBBBBgJi   XQQQ:   BBBB         BBQdKBQR iR2BBBB7BBB5PBBQ        ",
//     "      sBBBDvu..IJ7MBBBBBZLqi YXuQQBQ.              IdXdqBBPPPP7 bXPqEBQXbXMi       :    .i2QBBRRB:   :BQBg        BBQQBBU   .EBQB  QBs.ZBBB        ",
//     "      .BBZ:BBB BBBXDQQQXXuJB B:ESBQM               rQD.rBBi.qBi LB5.JBR.rBg.       ZEBBBBBBBjgBBB:    JBBB2       BBBP :   .gBBD       QBBB        ",
//     "        BIrQRI qgM.:BgQZ7uY   IUDBJ               UBBBBBBBBQBBBBBBBBBBBBBBBB:     iBBBMUr.   EBBBi     gBBBL      BBBB        .      LBBBB:        ",
//     "         :PBZqSI2IuEMgDQBQMgLBBBQ.                 :.... ..................:       .         ....       ...:      ....                ..           ",
//     "           7BBBBBBBBQRQQBBBBBBE.                                                                                                                   ",
//     "              rKQBBBBBBBBBg1:                                                                                                                      ",
//     "                   ....    "
//   ].join("\n"),
//   "text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:10px",
//   "color:#247257"
// );

console.log(
  `%c lsx-devtools %c 鑫家网 %c`,
  "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
  "background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
  "background:transparent"
);
