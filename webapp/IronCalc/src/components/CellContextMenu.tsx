import { Menu, MenuItem, styled } from "@mui/material";
import {
  BetweenHorizontalStart,
  BetweenVerticalStart,
  ChevronRight,
  Snowflake,
  Trash2,
} from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const red_color = "rgb(235, 12, 12)";

interface CellContextMenuProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLDivElement | null;
  onInsertRowAbove: () => void;
  onInsertRowBelow: () => void;
  onInsertColumnLeft: () => void;
  onInsertColumnRight: () => void;
  onFreezeColumns: () => void;
  onFreezeRows: () => void;
  onUnfreezeColumns: () => void;
  onUnfreezeRows: () => void;
  onDeleteRow: () => void;
  onDeleteColumn: () => void;
  row: number;
  column: string;
}

const CellContextMenu = (properties: CellContextMenuProps) => {
  const { t } = useTranslation();
  const {
    open,
    onClose,
    anchorEl,
    onInsertRowAbove,
    onInsertRowBelow,
    onInsertColumnLeft,
    onInsertColumnRight,
    onFreezeColumns,
    onFreezeRows,
    onUnfreezeColumns,
    onUnfreezeRows,
    onDeleteRow,
    onDeleteColumn,
    row,
    column,
  } = properties;
  const [freezeMenuOpen, setFreezeMenuOpen] = useState(false);
  const freezeRef = useRef(null);

  const [insertRowMenuOpen, setInsertRowMenuOpen] = useState(false);
  const insertRowRef = useRef(null);

  const [insertColumnMenuOpen, setInsertColumnMenuOpen] = useState(false);
  const insertColumnRef = useRef(null);

  return (
    <>
      <StyledMenu
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: 6,
        }}
      >
        <StyledMenuItem
          ref={insertColumnRef}
          onClick={() => setInsertColumnMenuOpen(true)}
        >
          <BetweenVerticalStartStyled />
          <ItemNameStyled>{t("cell_context.insert_column")}</ItemNameStyled>
          <ChevronRightStyled />
        </StyledMenuItem>
        <StyledMenuItem
          ref={insertRowRef}
          onClick={() => setInsertRowMenuOpen(true)}
        >
          <BetweenHorizontalStartStyled />
          <ItemNameStyled>{t("cell_context.insert_row")}</ItemNameStyled>
          <ChevronRightStyled />
        </StyledMenuItem>
        <MenuDivider />
        <StyledMenuItem ref={freezeRef} onClick={() => setFreezeMenuOpen(true)}>
          <StyledSnowflake />
          <ItemNameStyled>{t("cell_context.freeze")}</ItemNameStyled>
          <ChevronRightStyled />
        </StyledMenuItem>
        <MenuDivider />
        <StyledMenuItem onClick={onDeleteRow}>
          <StyledTrash />
          <ItemNameStyled style={{ color: red_color }}>
            {t("cell_context.delete_row", { row })}
          </ItemNameStyled>
        </StyledMenuItem>
        <StyledMenuItem onClick={onDeleteColumn}>
          <StyledTrash />
          <ItemNameStyled style={{ color: red_color }}>
            {t("cell_context.delete_column", { column })}
          </ItemNameStyled>
        </StyledMenuItem>
      </StyledMenu>
      <StyledMenu
        open={insertRowMenuOpen}
        onClose={() => setInsertRowMenuOpen(false)}
        anchorEl={insertRowRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <StyledMenuItem
          onClick={() => {
            setInsertRowMenuOpen(false);
            onInsertRowAbove();
          }}
        >
          <ItemNameStyled>{t("cell_context.insert_row_above")}</ItemNameStyled>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setInsertRowMenuOpen(false);
            onInsertRowBelow();
          }}
        >
          <ItemNameStyled>{t("cell_context.insert_row_below")}</ItemNameStyled>
        </StyledMenuItem>
      </StyledMenu>
      <StyledMenu
        open={insertColumnMenuOpen}
        onClose={() => setInsertColumnMenuOpen(false)}
        anchorEl={insertColumnRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <StyledMenuItem
          onClick={() => {
            setInsertColumnMenuOpen(false);
            onInsertColumnLeft();
          }}
        >
          <ItemNameStyled>
            {t("cell_context.insert_column_before")}
          </ItemNameStyled>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setInsertColumnMenuOpen(false);
            onInsertColumnRight();
          }}
        >
          <ItemNameStyled>
            {t("cell_context.insert_column_after")}
          </ItemNameStyled>
        </StyledMenuItem>
      </StyledMenu>
      <StyledMenu
        open={freezeMenuOpen}
        onClose={() => setFreezeMenuOpen(false)}
        anchorEl={freezeRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <StyledMenuItem
          onClick={() => {
            onFreezeColumns();
            setFreezeMenuOpen(false);
          }}
        >
          <ItemNameStyled>
            {t("cell_context.freeze_columns", { column })}
          </ItemNameStyled>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            onFreezeRows();
            setFreezeMenuOpen(false);
          }}
        >
          <ItemNameStyled>
            {t("cell_context.freeze_rows", { row })}
          </ItemNameStyled>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            onUnfreezeColumns();
            setFreezeMenuOpen(false);
          }}
        >
          <ItemNameStyled>{t("cell_context.unfreeze_columns")}</ItemNameStyled>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            onUnfreezeRows();
            setFreezeMenuOpen(false);
          }}
        >
          <ItemNameStyled>{t("cell_context.unfreeze_rows")}</ItemNameStyled>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};

const BetweenVerticalStartStyled = styled(BetweenVerticalStart)`
  width: 16px;
  height: 16px;
  color: #333333;
  padding-right: 10px;
`;

const BetweenHorizontalStartStyled = styled(BetweenHorizontalStart)`
  width: 16px;
  height: 16px;
  color: #333333;
  padding-right: 10px;
`;

const StyledSnowflake = styled(Snowflake)`
  width: 16px;
  height: 16px;
  color: #333333;
  padding-right: 10px;
`;

const StyledTrash = styled(Trash2)`
  width: 16px;
  height: 16px;
  color: ${red_color};
  padding-right: 10px;
`;

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    borderRadius: 8,
    padding: 4,
  },
  "& .MuiList-padding": {
    padding: 0,
  },
});

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  width: calc(100% - 8px);
  min-width: 172px;
  margin: 0px 4px;
  border-radius: 4px;
  padding: 8px;
  height: 32px;
`;

const MenuDivider = styled("div")`
  width: 100%;
  margin: auto;
  margin-top: 4px;
  margin-bottom: 4px;
  border-top: 1px solid #eeeeee;
`;

const ItemNameStyled = styled("div")`
  font-size: 12px;
  color: #333;
  flex-grow: 2;
`;

const ChevronRightStyled = styled(ChevronRight)`
  width: 16px;
  height: 16px;
`;

export default CellContextMenu;
