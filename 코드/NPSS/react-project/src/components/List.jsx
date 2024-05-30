import React, { useState } from 'react'

const ListItem = ({
    title,
    list,
    active,
    activeIndex,
    setActiveIndex,
    idx,
  }) => {
    
    const history = useHistory();
    const [clickedIdx, setClickedIdx] = useState();
  
    // 1단 메뉴 클릭 이벤트 처리 함수
    // 위에서 언급한 1단 메뉴 클릭 시 activeIndex라는 state에 해당 인덱스를 저장해준다
    const handleClick = () => {
      setActiveIndex(idx);
      setClickedIdx(null);
      history.push(`/${title}`);
    };
  
    // 2단 메뉴 클릭 이벤트 처리 함수
    const handleLink = (e, idx) => {
      setClickedIdx(idx);
      history.push({
        pathname: `/${title}`,
        state: {
          clicked: idx,
        },
      });
    };
  
    return (
      <Li>
        {/* // 상위 컴포넌트에서 받아온 active 변수를 className으로 넘겨준다
        // 이 때 `active`라는 변수가 활성화되면 이에 대응하는 스타일링을 처리해준다 */}
        <AccodianWrapper className={active}>
          <FirstMenu onClick={handleClick}>
            <IconWrapper>
              <RiDashboardLine />
            </IconWrapper>
            <Menu>{title}</Menu>
          </FirstMenu>
          <SecondMenu className={idx === activeIndex ? '' : 'closed'}>
            {list?.map((menu, idx) => (
              <li
                onClick={e => handleLink(e, idx)}
                className={clickedIdx === idx ? 'strong' : ''}
              >
                {menu}
              </li>
            ))}
          </SecondMenu>
        </AccodianWrapper>
      </Li>
    );
  };