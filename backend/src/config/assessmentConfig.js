module.exports = {
  // Health & Fitness Assessment (as_hr_02)
  as_hr_02: {
    sections: [
      {
        title: 'Key Body Vitals',
        fields: [
          { label: 'Heart Rate', path: 'vitalsMap.vitals.heart_rate', unit: 'bpm' },
          { label: 'Blood Pressure Systolic', path: 'vitalsMap.vitals.bp_sys', unit: 'mmHg' },
          { label: 'Blood Pressure Diastolic', path: 'vitalsMap.vitals.bp_dia', unit: 'mmHg' },
          { label: 'Oxygen Saturation', path: 'vitalsMap.vitals.oxy_sat_prcnt', unit: '%' },
          { label: 'Respiration Rate', path: 'vitalsMap.vitals.resp_rate', unit: 'breaths/min' }
        ],
      },
      {
        title: 'Heart Health',
        fields: [
          { label: 'Max Heart Rate (HRMax)', path: 'vitalsMap.metadata.heart_scores.HRMax', unit: 'bpm' },
          { label: 'Heart Rate Recovery (HRR)', path: 'vitalsMap.metadata.heart_scores.HRR', unit: '' },
          { label: 'Stress Index', path: 'vitalsMap.metadata.heart_scores.stress_index', unit: '' },
        ],
      },
      {
        title: 'Stress Level',
        fields: [
          { label: 'Stress Index', path: 'vitalsMap.metadata.heart_scores.stress_index', unit: '' },
          { label: 'Zone', path: 'vitalsMap.metadata.heart_scores.zone_details.zone', unit: '' }
        ]
      },
      {
        title: 'Fitness Levels',
        fields: [
          { label: 'Cardiovascular Endurance (Jog Test Time)', path: 'exercises[2].setList[0].time', unit: 'sec' },
          { label: 'VO2 Max', path: 'vitalsMap.metadata.physiological_scores.vo2max', unit: '' }
        ],
      },
      {
        title: 'Posture',
        fields: [
          { label: 'Posture Status', path: 'vitalsMap.posture', unit: '' },
          { label: 'Exercise Duration', path: 'timeElapsed', unit: 'sec' }
        ],
      },
      {
        title: 'Body Composition',
        fields: [
          { label: 'BMI', path: 'bodyCompositionData.BMI', unit: '' },
          { label: 'Body Fat % (BFC)', path: 'bodyCompositionData.BFC', unit: '%' },
          { label: 'Lean Mass (LM)', path: 'bodyCompositionData.LM', unit: 'kg' },
          { label: 'Weight', path: 'weight', unit: 'kg' },
          { label: 'Height', path: 'height', unit: 'cm' },
        ],
      }
    ],
    classification: {
      'vitalsMap.vitals.bp_sys': [
        { min: 0, max: 119, level: 'Normal' },
        { min: 120, max: 139, level: 'Elevated' },
        { min: 140, max: Infinity, level: 'High' }
      ],
      'vitalsMap.vitals.bp_dia': [
        { min: 0, max: 79, level: 'Normal' },
        { min: 80, max: 89, level: 'Elevated' },
        { min: 90, max: Infinity, level: 'High' }
      ],
      'vitalsMap.vitals.heart_rate': [
        { min: 0, max: 60, level: 'Low' },
        { min: 61, max: 100, level: 'Normal' },
        { min: 101, max: Infinity, level: 'High' }
      ],
      'bodyCompositionData.BMI': [
        { min: 0, max: 18.5, level: 'Underweight' },
        { min: 18.6, max: 24.9, level: 'Normal weight' },
        { min: 25, max: 29.9, level: 'Overweight' },
        { min: 30, max: Infinity, level: 'Obesity' }
      ]
    }
  },

  // Cardiac Assessment (as_card_01)
  as_card_01: {
    sections: [
      {
        title: 'Key Body Vitals',
        fields: [
          { label: 'Heart Rate', path: 'vitalsMap.vitals.heart_rate', unit: 'bpm' },
          { label: 'Blood Pressure Systolic', path: 'vitalsMap.vitals.bp_sys', unit: 'mmHg' },
          { label: 'Blood Pressure Diastolic', path: 'vitalsMap.vitals.bp_dia', unit: 'mmHg' },
          { label: 'Oxygen Saturation', path: 'vitalsMap.vitals.oxy_sat_prcnt', unit: '%' },
          { label: 'Respiration Rate', path: 'vitalsMap.vitals.resp_rate', unit: 'breaths/min' }
        ],
      },
      {
        title: 'Cardiovascular Endurance',
        fields: [
          { label: 'Cardiovascular Endurance (Jog Test Time)', path: 'exercises[2].setList[0].time', unit: 'sec' }
        ],
      },
      {
        title: 'Body Composition',
        fields: [
          { label: 'BMI', path: 'bodyCompositionData.BMI', unit: '' },
          { label: 'Body Fat % (BFC)', path: 'bodyCompositionData.BFC', unit: '%' },
          { label: 'Lean Mass (LM)', path: 'bodyCompositionData.LM', unit: 'kg' },
          { label: 'Weight', path: 'weight', unit: 'kg' },
          { label: 'Height', path: 'height', unit: 'cm' },
        ],
      }
    ],
    classification: {
      'vitalsMap.vitals.bp_sys': [
        { min: 0, max: 119, level: 'Normal' },
        { min: 120, max: 139, level: 'Elevated' },
        { min: 140, max: Infinity, level: 'High' }
      ],
      'vitalsMap.vitals.bp_dia': [
        { min: 0, max: 79, level: 'Normal' },
        { min: 80, max: 89, level: 'Elevated' },
        { min: 90, max: Infinity, level: 'High' }
      ],
      'vitalsMap.vitals.heart_rate': [
        { min: 0, max: 60, level: 'Low' },
        { min: 61, max: 100, level: 'Normal' },
        { min: 101, max: Infinity, level: 'High' }
      ],
      'bodyCompositionData.BMI': [
        { min: 0, max: 18.5, level: 'Underweight' },
        { min: 18.6, max: 24.9, level: 'Normal weight' },
        { min: 25, max: 29.9, level: 'Overweight' },
        { min: 30, max: Infinity, level: 'Obesity' }
      ]
    }
  }
};



