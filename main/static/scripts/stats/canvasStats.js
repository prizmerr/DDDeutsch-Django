if (window.innerHeight > window.innerWidth) {
    $("#canvas").css("height", "40vh");
}

const labels = [7, 6, 5, 4, 3, 2, 1];
const repeats = user_info['repeatsInWeek'];

const myConfig = {
    type: 'bar',
    title: {
      text: 'Ваша статистика за неделю',
      fontSize: 12,
      color: '#5d7d9a'
    },
    scaleX: {
      label: {
        text: 'Дни'
      },
      labels: labels
    },
    scaleY: {
      label: {
        text: 'Кол-во повторов'
      }
    },
    plot: {
      animation: {
        effect: 'ANIMATION_EXPAND_BOTTOM',
        method: 'ANIMATION_STRONG_EASE_OUT',
        sequence: 'ANIMATION_BY_NODE',
        speed: 275,
      }
    },
    series: [{
        values: repeats,
        backgroundColor: '#4d80a6',
        text: ""
      }
    ]
};

zingchart.render({
    id: 'canvas',
    data: myConfig,
    height: '100%',
    width: '100%'
}); 