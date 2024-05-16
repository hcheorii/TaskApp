import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";
export const container = style({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap", //화면을 좁혔을 때 요소가 아래로 내려가게 된다.
    rowGap: 15,
    minHeight: "max-content",
    padding: vars.spacing.big2,
    backgroundColor: vars.color.mainDarker,
});

export const title = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T2,
    marginRight: vars.spacing.big1,
});

export const addButton = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T2,
    cursor: "pointer",
    marginLeft: vars.spacing.big1,
    ":hover": {
        opacity: 0.8, //마우스를 갖다 댔을 떄 약간 연해지는..
    },
});

export const boardItem = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T3,
    backgroundColor: vars.color.mainFaded,
    padding: vars.spacing.medium,
    borderRadius: 10,
    cursor: "pointer",
    marginRight: vars.spacing.big1,
    ":hover": {
        opacity: 0.8,
        transform: "scale(1.03)",
    },
});

export const boardItemActive = style({
    //현재 active된 게시판에 대한 스타일링
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T3,
    backgroundColor: vars.color.selectedTab,
    padding: vars.spacing.medium,
    borderRadius: 10,
    cursor: "pointer",
    marginRight: vars.spacing.big1,
});

export const addSection = style({
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
});

export const smallTitle = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T3,
});
