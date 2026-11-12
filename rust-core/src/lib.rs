#[no_mangle]
pub extern "C" fn kvpv_preflight_ready(check_mask: u32, required_mask: u32) -> u32 {
    u32::from(check_mask & required_mask == required_mask)
}

#[no_mangle]
pub extern "C" fn kvpv_account_polling_mode(hidden: u32, focus_state: i32) -> u32 {
    if hidden != 0 {
        1
    } else if focus_state == 0 {
        2
    } else {
        0
    }
}

#[no_mangle]
pub extern "C" fn kvpv_boss_recovery_range(native_range: f64, fallback_range: f64) -> f64 {
    if native_range.is_finite() && native_range > 0.0 {
        native_range
    } else {
        fallback_range
    }
}

#[no_mangle]
pub extern "C" fn kvpv_boss_recovery_range_known(native_range: f64) -> u32 {
    u32::from(native_range.is_finite() && native_range > 0.0)
}

#[no_mangle]
pub extern "C" fn kvpv_boss_recovery_ring(
    native_range: f64,
    fallback_range: f64,
    margin: f64,
    min_ring: f64,
) -> f64 {
    min_ring.max(kvpv_boss_recovery_range(native_range, fallback_range) + margin)
}

#[no_mangle]
pub extern "C" fn kvpv_boss_recovery_full_hp(current: f64, maximum: f64) -> u32 {
    u32::from(current.is_finite() && maximum.is_finite() && maximum > 0.0 && current >= maximum)
}

#[cfg(test)]
mod tests {
    use super::{
        kvpv_account_polling_mode, kvpv_boss_recovery_full_hp, kvpv_boss_recovery_range,
        kvpv_boss_recovery_range_known, kvpv_boss_recovery_ring, kvpv_preflight_ready,
    };

    #[test]
    fn ready_requires_every_required_check() {
        assert_eq!(kvpv_preflight_ready(0b1_1111, 0b1_1111), 1);
        assert_eq!(kvpv_preflight_ready(0b11_1111, 0b1_1111), 1);
        for missing in 0..5 {
            assert_eq!(kvpv_preflight_ready(0b1_1111 & !(1 << missing), 0b1_1111), 0);
        }
    }

    #[test]
    fn unrelated_bits_do_not_change_readiness() {
        assert_eq!(kvpv_preflight_ready(0b1_1111 | (1 << 10), 0b1_1111), 1);
        assert_eq!(kvpv_preflight_ready(1 << 10, 0b1_1111), 0);
        assert_eq!(kvpv_preflight_ready(0, 0), 1);
    }

    #[test]
    fn polling_mode_preserves_hidden_and_focus_policy() {
        assert_eq!(kvpv_account_polling_mode(1, 1), 1);
        assert_eq!(kvpv_account_polling_mode(1, 0), 1);
        assert_eq!(kvpv_account_polling_mode(0, 0), 2);
        assert_eq!(kvpv_account_polling_mode(0, 1), 0);
        assert_eq!(kvpv_account_polling_mode(0, -1), 0);
    }

    #[test]
    fn recovery_geometry_preserves_valid_and_fallback_ranges() {
        assert_eq!(kvpv_boss_recovery_range(600.0, 350.0), 600.0);
        assert_eq!(kvpv_boss_recovery_range(0.0, 350.0), 350.0);
        assert_eq!(kvpv_boss_recovery_range(-1.0, 350.0), 350.0);
        assert_eq!(kvpv_boss_recovery_range(f64::INFINITY, 350.0), 350.0);
        assert_eq!(kvpv_boss_recovery_range_known(600.0), 1);
        assert_eq!(kvpv_boss_recovery_range_known(f64::NAN), 0);
        assert_eq!(kvpv_boss_recovery_ring(280.0, 350.0, 80.0, 360.0), 360.0);
        assert_eq!(kvpv_boss_recovery_ring(600.0, 350.0, 80.0, 360.0), 680.0);
    }

    #[test]
    fn full_hp_requires_finite_current_and_positive_maximum() {
        assert_eq!(kvpv_boss_recovery_full_hp(100.0, 100.0), 1);
        assert_eq!(kvpv_boss_recovery_full_hp(101.0, 100.0), 1);
        assert_eq!(kvpv_boss_recovery_full_hp(99.999, 100.0), 0);
        assert_eq!(kvpv_boss_recovery_full_hp(100.0, 0.0), 0);
        assert_eq!(kvpv_boss_recovery_full_hp(f64::INFINITY, 100.0), 0);
        assert_eq!(kvpv_boss_recovery_full_hp(100.0, f64::NAN), 0);
    }
}
